import fs from "node:fs/promises";
import path from "node:path";
const root = "assets-source/free-atlas";
await fs.mkdir(root, { recursive: true });
const manifest = JSON.parse(await fs.readFile("scripts/sources/bonehub-manifest.json", "utf8"));
const jobs = manifest.subjects.flatMap((subject) => manifest.regions.flatMap((region) => region.bones.filter((bone) => bone.files[subject.id]?.stl).map((bone) => ({ subject: subject.id, region: region.id, ...bone.files[subject.id] }))));
let completed = 0;
async function worker() {
  while (jobs.length) {
    const job = jobs.shift();
    const relative = `${job.subject}/${job.region}/${job.file}.stl`;
    const destination = `${root}/bones/${relative}`;
    try { if ((await fs.stat(destination)).size === job.stl) { completed++; continue; } } catch {}
    const url = `https://huggingface.co/datasets/${manifest.repo}/resolve/${manifest.revision}/${manifest.root}/Mesh/${relative}`;
    for (let attempt = 0; ; attempt++) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${response.status} ${relative}`);
        const buffer = Buffer.from(await response.arrayBuffer());
        if (buffer.length !== job.stl) throw new Error(`Unexpected file size: ${relative}`);
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.writeFile(destination, buffer);
        break;
      } catch (error) { if (attempt >= 2) throw error; }
    }
    completed++;
    if (completed % 25 === 0) console.log(`${completed}/285 BoneHub meshes downloaded`);
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log(`Ready: ${completed} BoneHub bone meshes`);
