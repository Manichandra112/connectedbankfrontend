import { MdTrendingUp, MdTrendingDown, MdInfoOutline } from 'react-icons/md'

/** Full Indian number format — exactly as shown in reference: ₹2,45,75,000.50 */
function formatINR(value) {
  if (value === null || value === undefined) return '—'
  const num = parseFloat(value)
  if (isNaN(num)) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

/** Pick font-size based on character length so the full number always fits */
function valueFontSize(str = '') {
  const len = str.length
  if (len <= 10) return '20px'
  if (len <= 13) return '17px'
  if (len <= 16) return '14px'
  return '12px'
}

export default function KPICard({ title, value, subtitle, change, changeUp, extra, icon: Icon, iconBg, iconColor }) {
  const formatted =
    typeof value === 'number' || (value && typeof value === 'object')
      ? formatINR(value)
      : value ?? '—'

  const fontSize = valueFontSize(formatted)

  return (
    <div className="bg-white rounded-xl shadow-card p-4 flex flex-col gap-2 hover:shadow-card-hover transition-shadow animate-fadeIn">

      {/* Top row: text left, icon right */}
      <div className="flex items-start gap-2">

        {/* Text block */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-center gap-1 text-gray-500 text-xs font-medium mb-1.5">
            <span className="truncate">{title}</span>
            <MdInfoOutline className="text-gray-300 text-sm cursor-pointer hover:text-gray-400 flex-shrink-0" />
          </div>

          {/* Value — full number, font shrinks to fit */}
          <p
            className="font-bold text-gray-900 leading-tight"
            style={{ fontSize, wordBreak: 'break-word' }}
          >
            {formatted}
          </p>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Icon badge */}
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            <Icon className={`text-2xl ${iconColor}`} />
          </div>
        )}
      </div>

      {/* Change indicator */}
      {change !== undefined && (
        <div className="flex items-center gap-1">
          {changeUp
            ? <MdTrendingUp className="text-success text-sm" />
            : <MdTrendingDown className="text-danger text-sm" />
          }
          <span className={`text-xs font-semibold ${changeUp ? 'text-success' : 'text-danger'}`}>
            {changeUp ? '▲' : '▼'} {change}% vs yesterday
          </span>
        </div>
      )}

      {/* Working capital utilisation bar */}
      {extra && (
        <div>
          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
            <span>Utilized {formatINR(extra.used)} ({extra.percent}%)</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all"
              style={{ width: `${extra.percent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
