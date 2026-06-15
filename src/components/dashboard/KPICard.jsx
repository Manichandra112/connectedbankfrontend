import { MdTrendingUp, MdTrendingDown, MdInfoOutline } from 'react-icons/md'

function formatINR(value) {
  if (value === null || value === undefined) return '—'
  const num = parseFloat(value)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR',
    minimumFractionDigits: 0, maximumFractionDigits: 2
  }).format(num)
}

export default function KPICard({ title, value, subtitle, change, changeUp, extra, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 flex flex-col gap-2 hover:shadow-card-hover transition-shadow animate-fadeIn">

      {/* Top row: title+value on left, icon pinned to top-right */}
      <div className="flex items-start gap-2">

        {/* Text block — takes all remaining space */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center gap-1 text-gray-500 text-xs font-medium mb-1.5">
            <span className="truncate">{title}</span>
            <MdInfoOutline className="text-gray-300 text-sm cursor-pointer hover:text-gray-400 flex-shrink-0" />
          </div>

          {/* Value — shrinks font so it never wraps */}
          <p className="font-bold text-gray-900 leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
             style={{ fontSize: 'clamp(14px, 2vw, 18px)' }}>
            {typeof value === 'number' || (value && typeof value === 'object')
              ? formatINR(value)
              : value ?? '—'}
          </p>

          {subtitle && (
            <p className="text-[11px] text-gray-400 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>

        {/* Icon — square badge, pinned top-right, never shrinks */}
        {Icon && (
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            <Icon className={`text-xl ${iconColor}`} />
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

      {/* Working capital progress */}
      {extra && (
        <div>
          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
            <span>Utilized {formatINR(extra.used)}</span>
            <span className="font-medium">{extra.percent}%</span>
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
