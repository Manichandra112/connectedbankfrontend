import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

function formatINR(value) {
  const num = parseFloat(value)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(num)
}

const DonutLabel = ({ cx, cy, totalLabel }) => (
  <>
    <text x={cx} y={cy - 5}  textAnchor="middle" fill="#374151" fontSize={10} fontWeight="600">Total</text>
    <text x={cx} y={cy + 10} textAnchor="middle" fill="#1a56db" fontSize={11} fontWeight="700">{totalLabel}</text>
  </>
)

export default function TopReceivables({ data = [], total }) {
  const totalLabel = total ? `₹${(parseFloat(total) / 100000).toFixed(2)}L` : '₹0'

  return (
    <div className="bg-white rounded-xl shadow-card p-4 animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-800">Top Receivables</h2>
        <button className="text-xs text-brand font-medium hover:underline">View All</button>
      </div>

      <div className="flex gap-3">
        {/* Donut chart */}
        <div className="w-28 h-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={48}
                dataKey="amount"
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [formatINR(v), '']}
                contentStyle={{ fontSize: 11, borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center -mt-2 text-[10px] font-semibold text-brand">{totalLabel}</p>
        </div>

        {/* Legend list */}
        <div className="flex-1 space-y-1.5 min-w-0">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className="text-[11px] text-gray-600 truncate max-w-[110px]">{item.partyName}</span>
              </div>
              <span className="text-[11px] font-semibold text-gray-800 whitespace-nowrap flex-shrink-0">
                {formatINR(item.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
