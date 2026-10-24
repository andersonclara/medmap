import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
try {
  const page = await browser.newPage();
  await page.goto(process.env.ATLAS_URL ?? "http://127.0.0.1:5173/");
  const assets = await page.evaluate(async () => {
    const { renderAnatomyAssets } = await import("/scripts/anatomy-asset-renderer.ts");
    return renderAnatomyAssets();
  });
  await mkdir("public/images/atlas", { recursive: true });
  for (const [name, data] of Object.entries(assets)) {
    await writeFile(`public/images/atlas/${name}.png`, Buffer.from(data.split(",")[1], "base64"));
    console.log(`Saved ${name}.png`);
  }
} finally { await browser.close(); }
