// Green Tests, Nothing Works: The Excuse Contest
// Writes the entry line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Node 22 stdlib only. Deterministic: same input, same bytes, every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I asked the code if it was working and it said yes, so I wrote that down as a test.";

// The gate: 1 to 140 characters, exactly one line, no trailing newline.
// Counted in Unicode code points ([...ENTRY]) so multi-byte characters
// are measured the way the judge counts them, not in UTF-16 code units.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 140) {
  throw new Error(
    `entry must be 1-140 characters, got ${charCount}: ${JSON.stringify(ENTRY)}`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be exactly one line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
