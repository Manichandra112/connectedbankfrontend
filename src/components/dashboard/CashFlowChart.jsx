import { MdInfoOutline } from 'react-icons/md'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'

function formatLakh(value) {
  return `${(value / 100000).toFixed(0)}L`
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="text-gray-600">{p.name}:</span>
          <span className="font-semibold">₹{(p.value / 100000).toFixed(2)}L</span>
        </div>
      ))}
    </div>
  )
}

export default function CashFlowChart({ data = [], totalInflow, totalOutflow }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 animate-fadeIn h-full flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <h2 className="text-sm font-semibold text-gray-800">Cash Flow Overview</h2>
          <MdInfoOutline className="text-gray-300 text-sm" />
        </div>
        <button className="text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 flex items-center gap-1">
          This Month <span className="text-[10px]">▼</span>
        </button>
      </div>

      <p className="text-[11px] text-gray-400 mb-3">This Month (May 2024)</p>

      {/* Legend + Totals */}
      <div className="flex items-center gap-5 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-success" />
          <span className="text-[11px] text-gray-500">Inflow</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-danger" />
          <span className="text-[11px] text-gray-500">Outflow</span>
        </div>
        <div className="ml-4 flex gap-4">
          <span className="text-sm font-bold text-success">
            {totalInflow
              ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalInflow)
              : '—'}
          </span>
          <span className="text-sm font-bold text-danger">
            {totalOutflow
              ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(totalOutflow)
              : '—'}
          </span>
        </div>
      </div>

      {/* Chart fills remaining height */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={3} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatLakh}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(241,245,249,0.5)' }} />
            <Bar dataKey="inflow"  name="Inflow"  fill="#0ca678" radius={[4,4,0,0]} />
            <Bar dataKey="outflow" name="Outflow" fill="#f03e3e" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
