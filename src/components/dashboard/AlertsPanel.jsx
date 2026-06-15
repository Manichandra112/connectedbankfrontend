import { MdWarningAmber, MdCheckCircle, MdInfo, MdError, MdArrowForward } from 'react-icons/md'

const severityConfig = {
  warning: { icon: MdWarningAmber, color: 'text-warning',  bg: 'bg-amber-50',   dot: 'bg-warning' },
  danger:  { icon: MdError,        color: 'text-danger',   bg: 'bg-red-50',     dot: 'bg-danger' },
  success: { icon: MdCheckCircle,  color: 'text-success',  bg: 'bg-green-50',   dot: 'bg-success' },
  info:    { icon: MdInfo,         color: 'text-brand',    bg: 'bg-blue-50',    dot: 'bg-brand' },
}

export default function AlertsPanel({ alerts = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-800">Alerts & Notifications</h2>
        <button className="text-xs text-brand font-medium hover:underline">View All</button>
      </div>

      <div className="space-y-2.5">
        {alerts.map((alert) => {
          const cfg = severityConfig[alert.severity] || severityConfig.info
          const Icon = cfg.icon
          return (
            <div key={alert.id} className={`flex gap-2.5 p-2.5 rounded-xl ${cfg.bg} transition-all hover:brightness-95 cursor-pointer`}>
              <div className="flex-shrink-0 mt-0.5">
                <Icon className={`text-base ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-gray-800 leading-tight">{alert.message}</p>
                {alert.subMessage && (
                  <p className="text-[10px] text-gray-500 mt-0.5">{alert.subMessage}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
