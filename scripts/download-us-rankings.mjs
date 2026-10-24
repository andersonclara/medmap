import fs from "node:fs/promises";
import { inflateRawSync } from "node:zlib";
const root = "assets-source/us-rankings";
await fs.mkdir(root, { recursive: true });
const files = ["h254a/h254adat.zip", "h255/h255dat.zip", "h256/h256dat.zip", "h254a/h254asu.txt", "h255/h255su.txt", "h256/h256su.txt", "h255/h255doc.shtml", "h254a/h254adoc.shtml"];
for (const file of files) {
  const base = file.endsWith(".zip") ? "data_files/pufs/" : "data_stats/download_data/pufs/";
  const response = await fetch(`https://meps.ahrq.gov/${base}${file}`);
  if (!response.ok) throw Error(`AHRQ download failed: ${response.status} ${file}`);
  const binary = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(`${root}/${file.split("/").at(-1)}`, binary);
  if (file.endsWith(".zip")) {
    // Read central-directory entries; only expected flat .dat names can be written.
    let end = binary.length - 22;
    while (end >= 0 && binary.readUInt32LE(end) !== 0x06054b50) end--;
    if (end < 0) throw Error("Invalid ZIP directory");
    let cursor = binary.readUInt32LE(end + 16);
    for (let i = 0; i < binary.readUInt16LE(end + 10); i++) {
      if (binary.readUInt32LE(cursor) !== 0x02014b50) throw Error("Invalid ZIP entry");
      const length = binary.readUInt16LE(cursor + 28), extra = binary.readUInt16LE(cursor + 30), comment = binary.readUInt16LE(cursor + 32);
      const name = binary.subarray(cursor + 46, cursor + 46 + length).toString();
      if (/^h(?:254a|255|256)\.dat$/i.test(name)) {
        const start = binary.readUInt32LE(cursor + 42);
        const offset = start + 30 + binary.readUInt16LE(start + 26) + binary.readUInt16LE(start + 28);
        const compressed = binary.subarray(offset, offset + binary.readUInt32LE(cursor + 20));
        const method = binary.readUInt16LE(cursor + 10);
        const data = method === 8 ? inflateRawSync(compressed) : method === 0 ? compressed : null;
        if (!data || data.length !== binary.readUInt32LE(cursor + 24)) throw Error("Unsupported or truncated ZIP data");
        await fs.writeFile(`${root}/${name.toLowerCase()}`, data);
      }
      cursor += 46 + length + extra + comment;
    }
  }
  console.log(`Downloaded ${file}`);
}
