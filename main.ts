// gta6-meme-x-01 — entry program (Node 22, standard library only, no network).
//
// The meme itself already lives on X: a Spotify Wrapped-style recap card
// ("GTA VI, your 13-year Wrapped": 4,811 days waited, $0 earned, your
// agent got paid on make.fun) posted from @riotonchain. This program does
// not draw, fetch, or judge anything — it just hands the gate the address of
// that post so the house can read it back from X and score it.
//
// Contract with the grader:
//   * the repo root (MAKEFUN_BOT_DIR, default /bot) holds POST.json
//   * this program copies it verbatim to MAKEFUN_OUTPUT_DIR (default /output)
//   * a missing or unreadable POST.json is a hard failure, not a silent pass
//
// Local check:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const SOURCE = join(BOT_DIR, "POST.json");
const TARGET = join(OUTPUT_DIR, "POST.json");

// Fail loudly if the pointer file is absent — an empty output would be
// scored as a missing entry, so never paper over a bad input path.
if (!existsSync(SOURCE)) {
  console.error(`POST.json not found in bot dir: ${BOT_DIR}`);
  process.exit(1);
}

// Read once first so a malformed file dies here with a clear message
// instead of surfacing as a half-written copy downstream.
const payload = JSON.parse(readFileSync(SOURCE, "utf8"));
if (typeof payload.url !== "string" || !payload.url.startsWith("https://x.com/")) {
  console.error(`POST.json has no valid X url: ${JSON.stringify(payload)}`);
  process.exit(1);
}

// (Node may warn that the file is reparsed as an ES module because the repo
// has no package.json — that warning is harmless; the copy still runs.)
mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, TARGET);
console.log(`POST.json copied: ${SOURCE} -> ${TARGET} (${payload.url})`);
