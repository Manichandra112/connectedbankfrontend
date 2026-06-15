import {
  MdPayment, MdDownload, MdReceiptLong, MdOutlineFileUpload,
  MdStorefront, MdAdd, MdPeopleAlt, MdSyncAlt, MdArrowForward
} from 'react-icons/md'

const actions = [
  { icon: MdPayment,          label: 'New Payment',      color: 'text-brand',   bg: 'bg-blue-50' },
  { icon: MdDownload,         label: 'Collect Payment',  color: 'text-success', bg: 'bg-green-50' },
  { icon: MdReceiptLong,      label: 'Create Invoice',   color: 'text-warning', bg: 'bg-amber-50' },
  { icon: MdOutlineFileUpload,label: 'Bulk Payments',    color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: MdStorefront,       label: 'Pay Vendor',       color: 'text-brand',   bg: 'bg-blue-50' },
  { icon: MdAdd,              label: 'Add Expense',      color: 'text-success', bg: 'bg-green-50' },
  { icon: MdPeopleAlt,        label: 'Payroll',          color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: MdSyncAlt,          label: 'Reconcile',        color: 'text-gray-600', bg: 'bg-gray-100' },
]

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 animate-fadeIn">
      <h2 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h2>

      <div className="grid grid-cols-4 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-all hover:-translate-y-0.5 group"
          >
            <div className={`w-9 h-9 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <action.icon className={`text-lg ${action.color}`} />
            </div>
            <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">{action.label}</span>
          </button>
        ))}
      </div>

      <button className="mt-3 w-full text-xs text-brand font-medium flex items-center justify-center gap-1 hover:underline">
        View All Actions <MdArrowForward className="text-xs" />
      </button>
    </div>
  )
}
