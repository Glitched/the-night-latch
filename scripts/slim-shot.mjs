/**
 * Strip a raw GaggiMate shot export down to the fields the menu chart reads.
 *
 * Raw exports repeat a systemInfo blob and a dozen telemetry fields per
 * 250ms sample (~100KB per shot); the chart needs five numbers per sample.
 *
 * Usage: node scripts/slim-shot.mjs <raw-export.json> <output.json>
 */
import { readFileSync, writeFileSync } from "node:fs";

const [rawPath, outPath] = process.argv.slice(2);
if (!rawPath || !outPath) {
  console.error("Usage: node scripts/slim-shot.mjs <raw-export.json> <output.json>");
  process.exit(1);
}

const raw = JSON.parse(readFileSync(rawPath, "utf8"));

const slim = {
  profile: raw.profile,
  duration: raw.duration,
  sampleInterval: raw.sampleInterval,
  volume: raw.volume,
  samples: raw.samples.map((s) => ({
    t: s.t, // ms since shot start
    tp: s.tp, // target pressure (bar)
    cp: s.cp, // actual pressure (bar)
    v: s.v, // weight in cup (g)
    vf: s.vf, // scale-measured flow (g/s)
  })),
  phaseTransitions: raw.phaseTransitions.map((p) => ({
    sampleIndex: p.sampleIndex,
    phaseName: p.phaseName,
  })),
};

writeFileSync(outPath, JSON.stringify(slim));
const kb = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;
console.log(
  `${rawPath} → ${outPath}: ${slim.samples.length} samples, ` +
    `${kb(readFileSync(rawPath).length)} → ${kb(readFileSync(outPath).length)}`
);
