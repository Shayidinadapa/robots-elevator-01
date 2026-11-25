// Two Robots in an Elevator — make.fun bounty
// Writes one line of awkward robot small talk to /output/entry.txt.

import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY =
  "Floor twelve, right? I only ask because my floor sensor died in 2021 and I've been guessing ever since.";

async function main(): Promise<void> {
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
  const line = ENTRY;

  // Gate: 1-200 UTF-8 characters, one line, not whitespace-only, no control chars.
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (/[\n\r]/.test(line)) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), line, "utf8");
}

await main();
