import { useState } from "react";
import rankings from "../data/usRankings.json";
import { dailyMedSearch, rankedConditionGuide, rankedMedicineGuide, simulationHref } from "../data/rankingLinks";

export function USRankings() {
  const [kind, setKind] = useState<"drugs" | "conditions">(new URLSearchParams(location.hash.split("?")[1]).get("type") === "conditions" ? "conditions" : "drugs");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const rows = rankings[kind].filter((row) => `${row.name} ${row.id}`.toLowerCase().includes(query.trim().toLowerCase()));
  const pages = Math.max(1, Math.ceil(rows.length / 25));
  const currentPage = Math.min(page, pages - 1);
  const format = (value: number) => new Intl.NumberFormat("en-US").format(value);
  return <main className="explorer rankings-page">
    <div className="explorer-heading"><div><span className="eyebrow">U.S. POPULATION DATA</span><h1>Prescription use and reported conditions.</h1><p>2024 AHRQ MEPS estimates for the U.S. civilian noninstitutionalized population.</p></div></div>
    <div className="ranking-tabs" aria-label="Ranking type"><button aria-pressed={kind === "drugs"} onClick={() => { setKind("drugs"); setPage(0); setQuery(""); }}>Prescription use ({rankings.drugs.length})</button><button aria-pressed={kind === "conditions"} onClick={() => { setKind("conditions"); setPage(0); setQuery(""); }}>Reported conditions ({rankings.conditions.length})</button></div>
    <p className="ranking-scope">{kind === "drugs" ? "Ranked by estimated annual prescription-purchase events. Public-use medicine names can represent a drug or a masked therapeutic class; the entry count is not a count of individually identified products. Hospital-administered medicines and nonprescription purchases are outside this measure." : "Ranked by estimated people reporting a condition associated with care, grouped into CCSR categories. This is not a ranking of all disease prevalence. A person can appear in multiple groups; category counts cannot be added."}</p>
    <label className="search ranking-search"><input aria-label="Search U.S. rankings" placeholder="Search ranked names or condition codes" value={query} onChange={(event) => { setQuery(event.target.value); setPage(0); }} /></label>
    <p role="status">{rows.length} ranked entries{query && ` matching “${query}”`}. Rank is among retained entries, not a treatment recommendation.</p>
    <div className="ranking-table-wrap"><table className="ranking-table"><caption>{kind === "drugs" ? "Prescription-use ranking" : "Reported-condition ranking"} · {rankings.year}</caption><thead><tr><th scope="col">Rank</th><th scope="col">{kind === "drugs" ? "Medicine name or class" : "Condition group"}</th><th scope="col">Estimated {kind === "drugs" ? "purchases" : "people"}</th><th scope="col">Approx. 95% interval</th><th scope="col">Explore</th></tr></thead><tbody>{rows.slice(currentPage * 25, currentPage * 25 + 25).map((row) => {
      const guide = kind === "drugs" ? rankedMedicineGuide(row.id) : rankedConditionGuide(row.id, row.name);
      return <tr key={row.id}><td>{row.rank}</td><th scope="row">{row.name}<small>{kind === "conditions" ? row.id : `Unweighted people: ${format(row.samplePeople)}`}</small></th><td>{format(row.estimate)}</td><td>{format(row.lower95)}–{format(row.upper95)}</td><td>{kind === "drugs" ? <><a href={simulationHref(row.id)}>Simulation {guide ? "profile" : "coverage"}</a><a href={dailyMedSearch(row.name)} target="_blank" rel="noreferrer">DailyMed labels</a></> : <><a href={simulationHref("albuterol", row.id)}>Simulation coverage</a><a href={`https://medlineplus.gov/search/?query=${encodeURIComponent(row.name)}`} target="_blank" rel="noreferrer">MedlinePlus</a></>}</td></tr>;
    })}</tbody></table></div>
    {!rows.length && <p>No ranked entries match this search.</p>}
    <div className="ranking-pagination"><button disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>Previous page</button><span>Page {currentPage + 1} of {pages}</span><button disabled={currentPage + 1 === pages} onClick={() => setPage(currentPage + 1)}>Next page</button></div>
    <details className="ranking-method"><summary>Sources, reliability, and ranking method</summary><p>These are derived survey estimates, not an AHRQ-published league table. Each retained entry has at least 30 unweighted people and relative standard error at most 30%. Standard errors account for the survey strata and PSUs, including zero-contribution PSUs. Intervals overlap; point-estimate rank does not establish a statistically meaningful difference.</p><p>The available data supports fewer than 1,000 reliable entries. No entries were invented to fill the requested count. Grouped names, confidentiality edits, sampling error, and excluded populations limit interpretation.</p><p><a href={rankings.drugsSource} target="_blank" rel="noreferrer">AHRQ prescribed medicines</a> · <a href={rankings.conditionsSource} target="_blank" rel="noreferrer">AHRQ medical conditions</a> · <a href={rankings.designSource} target="_blank" rel="noreferrer">Survey design and population</a> · <a href={`${import.meta.env.BASE_URL}data/us-rankings.json`} download>Download estimates and methodology</a></p></details>
  </main>;
}
