import { MdInfoOutline } from 'react-icons/md'
import { TbBuildingBank } from 'react-icons/tb'

function formatINR(value) {
  const num = parseFloat(value)
  const abs = Math.abs(num)
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR',
    minimumFractionDigits: abs % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(abs)
  return num < 0 ? `-${formatted}` : formatted
}

export default function AccountSummary({ accounts = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 animate-fadeIn h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <h2 className="text-sm font-semibold text-gray-800">Account Summary</h2>
          <MdInfoOutline className="text-gray-300 text-sm" />
        </div>
        <button className="text-xs text-brand font-medium hover:underline">
          View All Accounts
        </button>
      </div>

      <div className="space-y-2.5">
        {accounts.map((account) => {
          const isNegative = parseFloat(account.balance) < 0
          return (
            <div
              key={account.id}
              className="flex items-center gap-2.5 py-1.5 hover:bg-gray-50 rounded-lg px-1 transition-colors cursor-pointer"
            >
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: account.iconColor }}
              >
                {account.initials || 'CB'}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 leading-tight truncate">
                  {account.bankName} {account.accountType}
                </p>
                <p className="text-[10px] text-gray-400">···{account.accountNumber}</p>
              </div>

              {/* Balance */}
              <p className={`text-xs font-bold flex-shrink-0 ${isNegative ? 'text-danger' : 'text-gray-800'}`}>
                {formatINR(account.balance)}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
