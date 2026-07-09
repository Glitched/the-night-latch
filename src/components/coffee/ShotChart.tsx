import type { GaggiMateProfile, SlimShot } from "@/types/coffee";

/**
 * Static SVG rendering of an espresso shot. Server-rendered — ships no JS.
 *
 * With `shot` telemetry: two panels sharing a time axis — target vs actual
 * pressure on top, weight in the cup below. The weight curve deliberately
 * includes the post-pump tail: the machine cuts the pump early and the
 * drips land the last grams on target.
 *
 * With only `profile`: the planned pressure curve reconstructed from the
 * GaggiMate phases (steps and linear ramps), annotated with each phase's
 * exit target. Phase durations are maximums, hence the axis note.
 */

const W = 640;
const M = { left: 42, right: 14 };
const PLOT_X = M.left;
const PLOT_W = W - M.left - M.right;

const PRESSURE = "var(--shot-pressure)";
const WEIGHT = "var(--shot-weight)";
const GRID = "hsl(var(--border))";
const INK = "hsl(var(--muted-foreground))";

const scale =
  (d0: number, d1: number, r0: number, r1: number) => (d: number) =>
    r0 + ((d - d0) / (d1 - d0)) * (r1 - r0);

const path = (pts: { x: number; y: number }[]) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("");

const ticksEvery = (max: number, step: number) => {
  const out = [];
  for (let v = 0; v <= max; v += step) out.push(v);
  return out;
};

const EXIT_UNITS = { pressure: "bar", flow: "g/s", volumetric: "g" } as const;

/** Planned pressure curve from profile phases: [seconds, bar] vertices. */
function plannedCurve(profile: GaggiMateProfile) {
  const pts: { t: number; p: number }[] = [];
  let t = 0;
  let p = 0;
  for (const phase of profile.phases) {
    const target =
      phase.pump === 0 ? 0 : phase.pump.target === "pressure" ? phase.pump.pressure : p;
    if (phase.transition.type === "linear" && phase.transition.duration > 0) {
      const ramp = Math.min(phase.transition.duration, phase.duration);
      pts.push({ t, p });
      pts.push({ t: t + ramp, p: target });
    } else {
      pts.push({ t, p });
      pts.push({ t, p: target });
    }
    t += phase.duration;
    pts.push({ t, p: target });
    p = target;
  }
  return pts;
}

/** Phase boundary lines + staggered labels, shared by both modes. */
const PhaseMarkers = ({
  phases,
  x,
  y0,
  y1,
  sublabels,
}: {
  phases: { t: number; name: string }[];
  x: (t: number) => number;
  y0: number;
  y1: number;
  sublabels?: (string | null)[];
}) => (
  <g>
    {phases.map((phase, i) => (
      <g key={`${phase.name}-${i}`}>
        <line
          x1={x(phase.t)}
          y1={y0}
          x2={x(phase.t)}
          y2={y1}
          stroke={GRID}
          strokeDasharray="2 4"
        />
        <text
          x={x(phase.t) + 4}
          y={y0 + 11 + (i % 2) * 12}
          fontSize="10"
          fill={INK}
          className="font-sans"
        >
          {phase.name}
        </text>
        {sublabels?.[i] && (
          <text
            x={x(phase.t) + 4}
            y={y0 + 23 + (i % 2) * 12}
            fontSize="10"
            fill={INK}
            className="font-sans"
            opacity={0.8}
          >
            {sublabels[i]}
          </text>
        )}
      </g>
    ))}
  </g>
);

const Axis = ({
  ticks,
  x,
  y,
  label,
}: {
  ticks: number[];
  x: (t: number) => number;
  y: number;
  label: string;
}) => (
  <g className="font-sans">
    {ticks.map((t) => (
      <text key={t} x={x(t)} y={y} fontSize="10" fill={INK} textAnchor="middle">
        {t}
      </text>
    ))}
    <text x={PLOT_X + PLOT_W / 2} y={y + 14} fontSize="10" fill={INK} textAnchor="middle">
      {label}
    </text>
  </g>
);

const YGrid = ({
  ticks,
  y,
  top,
  bottom,
  title,
}: {
  ticks: number[];
  y: (v: number) => number;
  top: number;
  bottom: number;
  title: string;
}) => (
  <g className="font-sans">
    <text x={PLOT_X} y={top - 6} fontSize="11" fill={INK}>
      {title}
    </text>
    {ticks.map((v) => (
      <g key={v}>
        <line x1={PLOT_X} y1={y(v)} x2={PLOT_X + PLOT_W} y2={y(v)} stroke={GRID} strokeWidth="1" />
        <text x={PLOT_X - 6} y={y(v) + 3} fontSize="10" fill={INK} textAnchor="end">
          {v}
        </text>
      </g>
    ))}
    <line x1={PLOT_X} y1={bottom} x2={PLOT_X + PLOT_W} y2={bottom} stroke={INK} strokeWidth="1" />
  </g>
);

const Legend = ({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-sans text-muted-foreground mb-1">
    {items.map((item) => (
      <span key={item.label} className="inline-flex items-center gap-1.5">
        <svg width="18" height="8" aria-hidden="true">
          <line
            x1="1"
            y1="4"
            x2="17"
            y2="4"
            stroke={item.color}
            strokeWidth="2"
            strokeDasharray={item.dashed ? "4 3" : undefined}
          />
        </svg>
        {item.label}
      </span>
    ))}
  </div>
);

const ShotChart = ({ profile, shot }: { profile: GaggiMateProfile; shot?: SlimShot }) => {
  if (!shot) {
    // Planned curve only
    const pts = plannedCurve(profile);
    const tMax = Math.max(...pts.map((p) => p.t));
    const pMax = Math.ceil(Math.max(...pts.map((p) => p.p))) + 1;
    const top = 30;
    const bottom = 168;
    const x = scale(0, tMax, PLOT_X, PLOT_X + PLOT_W);
    const y = scale(0, pMax, bottom, top);

    let cursor = 0;
    const phaseMarks = profile.phases.map((phase) => {
      const mark = { t: cursor, name: phase.name };
      cursor += phase.duration;
      return mark;
    });
    const sublabels = profile.phases.map((phase) => {
      const target = phase.targets?.[0];
      if (!target) return null;
      return `${target.operator === "gte" ? "≥" : "≤"} ${target.value} ${EXIT_UNITS[target.type]}`;
    });

    return (
      <figure className="m-0">
        <Legend items={[{ label: "Planned pressure", color: PRESSURE, dashed: true }]} />
        <svg
          viewBox={`0 0 ${W} 216`}
          className="w-full h-auto"
          role="img"
          aria-label={`Planned pressure curve for the ${profile.label} profile`}
        >
          <YGrid ticks={ticksEvery(pMax, 1)} y={y} top={top} bottom={bottom} title="Pressure (bar)" />
          <PhaseMarkers phases={phaseMarks} x={x} y0={top} y1={bottom} sublabels={sublabels} />
          <path
            d={path(pts.map((p) => ({ x: x(p.t), y: y(p.p) })))}
            fill="none"
            stroke={PRESSURE}
            strokeWidth="2"
            strokeDasharray="5 4"
          />
          <Axis
            ticks={ticksEvery(tMax, 5)}
            x={x}
            y={bottom + 14}
            label="Phase maximums (s) — exit targets end phases early"
          />
        </svg>
      </figure>
    );
  }

  // Real pull: pressure panel + weight panel on a shared time axis
  const samples = shot.samples;
  const tMax = (samples[samples.length - 1]?.t ?? shot.duration) / 1000;
  const pMax = Math.ceil(Math.max(...samples.map((s) => Math.max(s.cp, s.tp))));
  const weightTarget = profile.phases
    .flatMap((phase) => phase.targets ?? [])
    .find((target) => target.type === "volumetric")?.value;
  const wMax = Math.ceil(Math.max(shot.volume, weightTarget ?? 0) / 10) * 10 + 5;

  const pTop = 30;
  const pBottom = 172;
  const wTop = 206;
  const wBottom = 288;

  const x = scale(0, tMax, PLOT_X, PLOT_X + PLOT_W);
  const yP = scale(0, pMax, pBottom, pTop);
  const yW = scale(0, wMax, wBottom, wTop);
  const toSec = (ms: number) => ms / 1000;

  const phaseMarks = shot.phaseTransitions.map((p) => ({
    t: toSec(samples[p.sampleIndex]?.t ?? 0),
    name: p.phaseName,
  }));

  // Where brew-by-weight cut the pump: target pressure drops to 0,
  // and the drips take the cup the rest of the way to target.
  const cutIndex = samples.findIndex((s, i) => i > 0 && s.tp === 0 && samples[i - 1]!.tp > 0);
  const pumpCutT = cutIndex > 0 ? toSec(samples[cutIndex]!.t) : null;

  return (
    <figure className="m-0">
      <Legend
        items={[
          { label: "Target pressure", color: PRESSURE, dashed: true },
          { label: "Actual pressure", color: PRESSURE },
          { label: "Weight in cup", color: WEIGHT },
        ]}
      />
      <svg
        viewBox={`0 0 ${W} 322`}
        className="w-full h-auto"
        role="img"
        aria-label={`Shot telemetry for ${shot.profile}: ${shot.volume} grams in ${(
          shot.duration / 1000
        ).toFixed(1)} seconds`}
      >
        <YGrid
          ticks={ticksEvery(pMax, 1)}
          y={yP}
          top={pTop}
          bottom={pBottom}
          title="Pressure (bar)"
        />
        <YGrid
          ticks={ticksEvery(wMax, 20)}
          y={yW}
          top={wTop}
          bottom={wBottom}
          title="Weight in cup (g)"
        />
        <PhaseMarkers phases={phaseMarks} x={x} y0={pTop} y1={wBottom} />

        {pumpCutT !== null && (
          <g className="font-sans">
            <line
              x1={x(pumpCutT)}
              y1={pTop}
              x2={x(pumpCutT)}
              y2={wBottom}
              stroke={INK}
              strokeDasharray="2 4"
              opacity={0.7}
            />
            <text x={x(pumpCutT) - 4} y={pTop + 11} fontSize="10" fill={INK} textAnchor="end">
              pump off
            </text>
            <text
              x={x(pumpCutT) - 4}
              y={wBottom - 10}
              fontSize="10"
              fill={INK}
              opacity={0.8}
              textAnchor="end"
            >
              drips finish the shot
            </text>
          </g>
        )}

        <path
          d={path(samples.map((s) => ({ x: x(toSec(s.t)), y: yP(s.tp) })))}
          fill="none"
          stroke={PRESSURE}
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <path
          d={path(samples.map((s) => ({ x: x(toSec(s.t)), y: yP(s.cp) })))}
          fill="none"
          stroke={PRESSURE}
          strokeWidth="2"
        />

        {weightTarget && (
          <g className="font-sans">
            <line
              x1={PLOT_X}
              y1={yW(weightTarget)}
              x2={PLOT_X + PLOT_W}
              y2={yW(weightTarget)}
              stroke={WEIGHT}
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity={0.7}
            />
            <text x={PLOT_X + 6} y={yW(weightTarget) - 5} fontSize="10" fill={INK}>
              {weightTarget} g target
            </text>
          </g>
        )}
        <path
          d={path(samples.map((s) => ({ x: x(toSec(s.t)), y: yW(s.v) })))}
          fill="none"
          stroke={WEIGHT}
          strokeWidth="2"
        />

        <Axis ticks={ticksEvery(tMax, 5)} x={x} y={wBottom + 14} label="Time (s)" />
      </svg>
    </figure>
  );
};

export default ShotChart;
