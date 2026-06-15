import { MdTrendingUp, MdSavings, MdCreditScore, MdArrowForward } from 'react-icons/md'

const iconMap = {
  collections: { icon: MdTrendingUp,  bg: 'bg-blue-50',  color: 'text-brand' },
  tax:         { icon: MdSavings,     bg: 'bg-green-50', color: 'text-success' },
  credit:      { icon: MdCreditScore, bg: 'bg-amber-50', color: 'text-warning' },
}

export default function AIInsights({ insights = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 animate-fadeIn">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-sm font-semibold text-gray-800">AI Business Insights</h2>
        <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">Beta</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {insights.map((insight, i) => {
          const cfg = iconMap[insight.iconType] || iconMap.collections
          const Icon = cfg.icon
          return (
            <div key={i} className="flex gap-2.5 p-3 rounded-xl border border-gray-100 hover:border-brand/30 hover:shadow-sm transition-all cursor-pointer group">
              <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`text-lg ${cfg.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-gray-700 leading-snug">{insight.message}</p>
                <button className="mt-1.5 text-[11px] text-brand font-semibold flex items-center gap-0.5 group-hover:gap-1 transition-all">
                  {insight.linkText} <MdArrowForward className="text-xs" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
