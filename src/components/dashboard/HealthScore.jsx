import { MdInfoOutline, MdArrowForward } from 'react-icons/md'

export default function HealthScore({ score = 78, label = 'Good', description, explanation }) {
  const cx = 90
  const cy = 85
  const r  = 68
  const strokeWidth = 14

  const circumference = 2 * Math.PI * r
  const arcLength  = circumference * 0.75
  const gapLength  = circumference * 0.25
  const filled     = (score / 100) * arcLength

  // Color based on score for label
  const scoreColor = score >= 75 ? '#12b886' : score >= 50 ? '#f59f00' : '#f03e3e'

  const rotation = `rotate(135 ${cx} ${cy})`

  // Build gradient stops along the arc: yellow (0%) → yellow-green (50%) → green (100%)
  // We use a linearGradient approximation; for the arc gradient we use SVG linearGradient
  const gradId = 'healthGrad'

  return (
    <div className="bg-white rounded-xl shadow-card p-4 animate-fadeIn">
      <div className="flex items-center gap-1 mb-2">
        <h2 className="text-sm font-semibold text-gray-800">Business Health Score</h2>
        <MdInfoOutline className="text-gray-300 text-sm" />
      </div>

      <div className="flex flex-col items-center">
        <svg
          width="180"
          height="140"
          viewBox="0 0 180 150"
          overflow="visible"
        >
          <defs>
            {/* Gradient: yellow on left → green on right */}
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#f9c74f" />
              <stop offset="45%"  stopColor="#90be6d" />
              <stop offset="100%" stopColor="#12b886" />
            </linearGradient>
          </defs>

          {/* ── Gray background track (270° arc) ── */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${gapLength}`}
            strokeLinecap="round"
            transform={rotation}
          />

          {/* ── Gradient score arc ── */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${filled} ${circumference - filled}`}
            strokeLinecap="round"
            transform={rotation}
          />

          {/* ── Score number + /100 inline ── */}
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            fill="#111827"
            fontSize="28"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
          >
            {score}
            <tspan fill="#9ca3af" fontSize="14" fontWeight="500" dy="4"> /100</tspan>
          </text>

          {/* ── "Good" label inside SVG below score ── */}
          <text
            x={cx}
            y={cy + 30}
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
        <p className="text-[11px] text-gray-500 text-center -mt-2 leading-snug px-2">
          {description || 'Great! Your business is financially healthy.'}
        </p>

        {/* Explanation (dynamic factors from backend) */}
        {explanation && (
          <p className="text-[9.5px] text-gray-400 text-center mt-1 leading-snug px-2 italic">
            {explanation}
          </p>
        )}

        {/* CTA */}
        <button className="mt-2 text-xs text-brand font-semibold flex items-center gap-0.5 hover:underline">
          View Full Report <MdArrowForward className="text-xs" />
        </button>
      </div>
    </div>
  )
}
