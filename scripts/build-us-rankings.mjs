import fs from "node:fs/promises";
import crypto from "node:crypto";

const root = "assets-source/us-rankings";
const read = (file) => fs.readFile(`${root}/${file}`, "utf8");
function layout(sas) {
  return new Map([...sas.matchAll(/@(\d+)\s+(\w+)\s+\$?(\d+)\.\d+/g)].map((m) => [m[2], [Number(m[1]) - 1, Number(m[3])]]));
}
const field = (row, fields, name) => { const spec = fields.get(name); if (!spec) throw Error(`Missing field ${name}`); return row.slice(spec[0], spec[0] + spec[1]).trim(); };
const personLayout = layout(await read("h256su.txt"));
const people = new Map(), design = new Map();
for (const row of (await read("h256.dat")).split(/\r?\n/)) {
  if (!row) continue;
  const weight = Number(field(row, personLayout, "PERWT24F")); if (!(weight > 0)) continue;
  const stratum = field(row, personLayout, "VARSTR"), psu = field(row, personLayout, "VARPSU");
  people.set(field(row, personLayout, "DUPERSID"), { weight, stratum, psu });
  if (!design.has(stratum)) design.set(stratum, new Set()); design.get(stratum).add(psu);
}
for (const psus of design.values()) if (psus.size < 2) throw Error("Unresolved singleton variance stratum");
if (people.size < 1000 || design.size < 10) throw Error("Incomplete MEPS person/design input");
function group(map, id, name) {
  if (!map.has(id)) map.set(id, { id, name, people: new Set(), psus: new Map(), estimate: 0 });
  return map.get(id);
}
function add(entry, id, person, deduplicate) {
  if (deduplicate && entry.people.has(id)) return;
  entry.people.add(id); entry.estimate += person.weight;
  const key = `${person.stratum}:${person.psu}`;
  entry.psus.set(key, (entry.psus.get(key) ?? 0) + person.weight);
}
function summarize(entry) {
  let variance = 0;
  for (const [stratum, psus] of design) {
    const totals = [...psus].map((psu) => entry.psus.get(`${stratum}:${psu}`) ?? 0);
    const mean = totals.reduce((a, b) => a + b, 0) / totals.length;
    variance += totals.length / (totals.length - 1) * totals.reduce((sum, value) => sum + (value - mean) ** 2, 0);
  }
  const se = Math.sqrt(variance), rse = se / entry.estimate;
  return { eligible: entry.people.size >= 30 && rse <= .3, id: entry.id, name: entry.name, estimate: Math.round(entry.estimate), standardError: Math.round(se), relativeStandardError: Number(rse.toFixed(6)), samplePeople: entry.people.size, lower95: Math.max(0, Math.round(entry.estimate - 1.96 * se)), upper95: Math.round(entry.estimate + 1.96 * se) };
}
const drugLayout = layout(await read("h254asu.txt")), drugs = new Map();
for (const row of (await read("h254a.dat")).split(/\r?\n/)) {
  if (!row) continue;
  const id = field(row, drugLayout, "DUPERSID"), person = people.get(id); if (!person) continue;
  const name = field(row, drugLayout, "RXDRGNAM");
  if (!name || /^-|UNKNOWN|UNIDENTIFIED|UNSPECIFIED$/i.test(name) || Number(field(row, drugLayout, "DIABEQUIP")) === 1) continue;
  add(group(drugs, name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), name), id, person, false);
}
const labels = new Map();
const html = await read("h255doc.shtml");
for (const match of html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
  const cells = [...match[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => cell[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").trim());
  for (let i = 0; i + 1 < cells.length; i++) if (/^[A-Z]{3}\d{3}$/.test(cells[i]) && !/INAPPLICABLE|CANNOT BE COMPUTED/i.test(cells[i + 1])) labels.set(cells[i], cells[i + 1]);
}
const conditionLayout = layout(await read("h255su.txt")), conditions = new Map();
for (const row of (await read("h255.dat")).split(/\r?\n/)) {
  if (!row) continue;
  const id = field(row, conditionLayout, "DUPERSID"), person = people.get(id); if (!person) continue;
  for (const name of ["CCSR1X", "CCSR2X", "CCSR3X", "CCSR4X"]) {
    const code = field(row, conditionLayout, name);
    if (!labels.has(code) || /^(FAC|EXT)|000$/.test(code)) continue;
    add(group(conditions, code, labels.get(code)), id, person, true);
  }
}
const rank = (map) => [...map.values()].map(summarize).filter((row) => row.eligible).sort((a, b) => b.estimate - a.estimate || a.name.localeCompare(b.name)).slice(0, 1000).map(({ eligible, ...row }, index) => ({ rank: index + 1, ...row }));
if (labels.size < 100 || drugs.size < 100 || conditions.size < 100) throw Error("Incomplete MEPS catalog or category descriptions");
const files = ["h254a.dat", "h255.dat", "h256.dat", "h254asu.txt", "h255su.txt", "h256su.txt", "h255doc.shtml"];
const hashes = Object.fromEntries(await Promise.all(files.map(async (file) => [file, crypto.createHash("sha256").update(await fs.readFile(`${root}/${file}`)).digest("hex")])));
const data = { year: 2024, generated: new Date().toISOString().slice(0, 10), population: "U.S. civilian noninstitutionalized population", weightedPopulation: Math.round([...people.values()].reduce((sum, p) => sum + p.weight, 0)), source: "AHRQ Medical Expenditure Panel Survey (MEPS)", drugsSource: "https://meps.ahrq.gov/data_stats/download_data_files_detail.jsp?cboPufNumber=HC-254A", conditionsSource: "https://meps.ahrq.gov/data_stats/download_data_files_detail.jsp?cboPufNumber=HC-255", designSource: "https://meps.ahrq.gov/data_stats/download_data_files_detail.jsp?cboPufNumber=HC-256", method: "Derived survey estimates, not an AHRQ-published league table. Drug ranks: sum of person weights over prescription-purchase events, grouped by public-use RXDRGNAM (some names are anonymized therapeutic classes). Condition ranks: weighted unique people per reported CCSR category across CCSR1X-CCSR4X, associated with medical care; not prevalence of all disease in America. Rank is point-estimate order; overlapping intervals do not establish a difference. Taylor stratified-PSU total standard errors include zero-contribution PSUs from the full positive-weight person sample. Filter: at least 30 unweighted people and relative standard error at most 30%. Equipment, invalid names, non-condition FAC/EXT codes and unmapped categories are excluded. No synthetic padding to reach 1,000.", inputSha256: hashes, drugs: rank(drugs), conditions: rank(conditions) };
await fs.writeFile("src/data/usRankings.json", JSON.stringify(data, null, 2));
await fs.mkdir("public/data", { recursive: true });
await fs.writeFile("public/data/us-rankings.json", JSON.stringify(data, null, 2));
console.log(JSON.stringify({ drugs: data.drugs.length, conditions: data.conditions.length, population: data.weightedPopulation, drugTop: data.drugs.slice(0, 3), conditionTop: data.conditions.slice(0, 3) }, null, 2));
