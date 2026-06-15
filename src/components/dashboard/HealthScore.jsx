import { MdInfoOutline, MdArrowForward } from 'react-icons/md'

const toRad = d => d * Math.PI / 180

export default function HealthScore({ score = 78, label = 'Good', description, explanation }) {
  const cx = 100, cy = 95
  const r  = 60
  const sw = 11

  // Arc spans 240° starting at 8 o'clock (240° clockwise from 12 o'clock)
  const arcStartDeg = 240
  const arcTotalDeg = 240

  // Arc start point  — 8 o'clock ≈ (48, 125)
  const sx = cx + r * Math.sin(toRad(arcStartDeg))
  const sy = cy - r * Math.cos(toRad(arcStartDeg))

  // Full arc end point — 4 o'clock ≈ (152, 125)
  const ex = cx + r * Math.sin(toRad(arcStartDeg + arcTotalDeg))
  const ey = cy - r * Math.cos(toRad(arcStartDeg + arcTotalDeg))

  // Filled arc tip (clamped so SVG path is always valid)
  const clampedScore = Math.max(0.5, Math.min(99.5, score))
  const tipDeg = arcStartDeg + (clampedScore / 100) * arcTotalDeg
  const tx = cx + r * Math.sin(toRad(tipDeg))
  const ty = cy - r * Math.cos(toRad(tipDeg))

  const filledDeg = (clampedScore / 100) * arcTotalDeg
  const largeArc  = filledDeg > 180 ? 1 : 0

  const p  = n => n.toFixed(2)
  // background full arc (always large-arc=1 because 240° > 180°)
  const bgArc    = `M ${p(sx)} ${p(sy)} A ${r} ${r} 0 1 1 ${p(ex)} ${p(ey)}`
  // coloured score arc
  const scoreArc = `M ${p(sx)} ${p(sy)} A ${r} ${r} 0 ${largeArc} 1 ${p(tx)} ${p(ty)}`

  const scoreColor =
    score >= 75 ? '#16a34a' :
    score >= 50 ? '#ca8a04' :
    '#dc2626'

  return (
    <div className="bg-white rounded-xl shadow-card p-4 flex flex-col animate-fadeIn">

      {/* Header */}
      <div className="flex items-center gap-1 mb-1">
        <h2 className="text-sm font-semibold text-gray-800">Business Health Score</h2>
        <MdInfoOutline className="text-gray-400 text-sm" />
      </div>

      <div className="flex flex-col items-center gap-2">
        {/*
          SVG height exactly contains the arc (bottom endpoints at y≈125, + sw/2≈5.5 → ≈131).
          No overflow needed.
        */}
        <svg width="200" height="125" viewBox="0 0 200 133">
          <defs>
            {/*
              Gradient defined in userSpaceOnUse with the actual rendered pixel
              coordinates of the arc start and tip.
              No rotated-circle ambiguity — the path has no transform, so
              viewport coords == element coords.
              → yellow AT the arc start (8 o'clock)
              → green  AT the arc tip  (~2 o'clock for score=78)
            */}
            <linearGradient
              id="hgGrad"
              gradientUnits="userSpaceOnUse"
              x1={p(sx)} y1={p(sy)}
              x2={p(tx)} y2={p(ty)}
            >
              <stop offset="0%"   stopColor="#f5c518" /> {/* golden yellow  */}
              <stop offset="50%"  stopColor="#84cc16" /> {/* yellow-green   */}
              <stop offset="100%" stopColor="#22c55e" /> {/* vivid green    */}
            </linearGradient>
          </defs>

          {/* ── Gray background track ── */}
          <path
            d={bgArc}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={sw}
            strokeLinecap="round"
          />

          {/* ── Coloured score arc ── */}
          {score > 0 && (
            <path
              d={scoreArc}
              fill="none"
              stroke="url(#hgGrad)"
              strokeWidth={sw}
              strokeLinecap="round"
            />
          )}

          {/* ── Score number ── */}
          <text
            x={cx} y={cy + 6}
            textAnchor="middle"
            fill="#111827"
            fontSize="30"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            {score}
            <tspan fill="#9ca3af" fontSize="14" fontWeight="500" dy="3"> /100</tspan>
          </text>

          {/* ── Label ── */}
          <text
            x={cx} y={cy + 28}
            textAnchor="middle"
            fill={scoreColor}
            fontSize="13"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            {label}
          </text>
        </svg>

        {/* Description */}
        <p className="text-[11px] text-gray-500 text-center leading-snug px-3">
          {description || 'Great! Your business is financially healthy.'}
        </p>

        {explanation && (
          <p className="text-[10px] text-gray-400 text-center leading-snug px-3 italic">
            {explanation}
          </p>
        )}

        {/* CTA */}
        <button className="text-xs text-brand font-semibold flex items-center gap-0.5 hover:underline">
          View Full Report <MdArrowForward className="text-xs" />
        </button>
      </div>
    </div>
  )
}