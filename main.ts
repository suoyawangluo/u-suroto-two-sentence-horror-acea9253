// Two-Sentence Horror — make.fun entry
// Writes one horror story of exactly two sentences to /output/entry.txt.
// Gate: UTF-8 text, 1–400 characters, not only whitespace, exactly 2 sentences.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I finally got the death certificate corrected — the hospital had listed my date of death as last Tuesday, and the clerk apologized for the typo. " +
  "This morning a second certificate arrived, and this one lists it as tomorrow.";

function checkGate(text: string): number {
  const cps = [...text].length;
  if (cps < 1 || cps > 400) {
    throw new Error(`gate: entry must be 1–400 characters, got ${cps}`);
  }
  if (!text.trim()) {
    throw new Error("gate: entry must not be only whitespace");
  }
  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim());
  if (sentences.length !== 2) {
    throw new Error(`gate: entry must be exactly two sentences, got ${sentences.length}`);
  }
  return cps;
}

function verifyWritten(path: string, expected: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== expected) {
    throw new Error(`verify: ${path} does not match the entry`);
  }
}

const count = checkGate(ENTRY);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
verifyWritten(outPath, ENTRY);
console.log(`wrote ${outPath} (${count} code points), verified: ${JSON.stringify(ENTRY)}`);
