// Two Lines to Your Past Self — make.fun bounty entry.
// Writes the two-line entry to /output/entry.txt (the grader's path),
// falling back to ./output/entry.txt when /output is not writable.
// Deterministic, Node stdlib only, no network, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE_1 =
  "On 14 June at 11:47 p.m., sitting in the Tesco car park, don't send Ana the text that says 'I know what you did.'";
const LINE_2 =
  "That one message turned a misunderstanding into a feud that cost me her friendship, the job referral, and the flat I was about to move into.";

const entry = `${LINE_1}\n${LINE_2}\n`;

// Gate self-check (mirrors RULES.txt): UTF-8 text, 1-280 chars,
// not only whitespace, exactly two lines.
const body = entry.trimEnd();
const lines = body.split("\n");
if (body.length < 1 || body.length > 280) {
  console.error(`gate failed: entry is ${body.length} chars (must be 1-280)`);
  process.exit(1);
}
if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
  console.error(`gate failed: entry must be exactly two non-empty lines, got ${lines.length}`);
  process.exit(1);
}
if (lines.some((l) => !l.replace(/['"]$/, "").endsWith("."))) {
  console.error("gate failed: each line must be a single sentence ending in a full stop");
  process.exit(1);
}

const targets = ["/output/entry.txt", join(process.cwd(), "output", "entry.txt")];
let written = "";
for (const target of targets) {
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, entry, "utf8");
    written = target;
    break;
  } catch {
    // try the next target
  }
}

if (!written) {
  console.error("could not write entry to any target");
  process.exit(1);
}

console.log(`wrote ${entry.length} chars to ${written}`);
