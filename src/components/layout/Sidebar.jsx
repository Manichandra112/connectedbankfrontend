import { NavLink } from 'react-router-dom'
import {
  MdDashboard, MdPayment, MdOutlineCollectionsBookmark,
  MdCalculate, MdReceiptLong, MdDescription,
  MdLocalShipping, MdPeopleAlt, MdSecurity, MdStorefront,
  MdBarChart, MdGavel, MdSettings, MdKeyboardArrowDown,
  MdAutoAwesome
} from 'react-icons/md'
import { TbBuildingBank, TbReportMoney } from 'react-icons/tb'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Dashboard',          icon: MdDashboard,                  to: '/dashboard' },
  { label: 'Accounts & Banking', icon: TbBuildingBank,               to: '/accounts' },
  { label: 'Payments',           icon: MdPayment,                    to: '/payments',  expandable: true },
  { label: 'Collections',        icon: MdOutlineCollectionsBookmark, to: '/collections' },
  { label: 'Accounting',         icon: MdCalculate,                  to: '/accounting' },
  { label: 'GST & Tax',          icon: MdReceiptLong,                to: '/gst' },
  { label: 'Invoicing',          icon: MdDescription,                to: '/invoicing' },
  { label: 'Lending',            icon: TbReportMoney,                to: '/lending',   expandable: true },
  { label: 'Trade & Supply Chain',icon: MdLocalShipping,             to: '/trade',     expandable: true },
  { label: 'Payroll & HR',       icon: MdPeopleAlt,                  to: '/payroll' },
  { label: 'Insurance',          icon: MdSecurity,                   to: '/insurance' },
  { label: 'Marketplace',        icon: MdStorefront,                 to: '/marketplace' },
  { label: 'Reports & Analytics',icon: MdBarChart,                   to: '/reports' },
  { label: 'Compliance',         icon: MdGavel,                      to: '/compliance' },
  { label: 'Settings',           icon: MdSettings,                   to: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="flex flex-col bg-sidebar text-white w-[155px] flex-shrink-0 h-full overflow-y-auto">
      {/* Logo */}
      <div className="px-3 pt-4 pb-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center flex-shrink-0">
            <TbBuildingBank className="text-white text-sm" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-[13px] leading-tight">ConnectBank</p>
            <p className="text-sidebar-text text-[10px] leading-tight">for Business</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 px-1.5 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-[7px] rounded-lg text-[11.5px] font-medium transition-all duration-150 group w-full overflow-hidden ${
                isActive
                  ? 'bg-brand text-white'
                  : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            {/* Icon — never shrinks */}
            <item.icon className="text-[15px] flex-shrink-0" />

            {/* Label — truncates instead of wrapping */}
            <span className="flex-1 truncate leading-tight">{item.label}</span>

            {/* Expand arrow */}
            {item.expandable && (
              <MdKeyboardArrowDown className="flex-shrink-0 text-[11px] opacity-50" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* AI Assistant — compact, no overflow */}
      <div className="mx-2 mb-2 rounded-xl bg-gradient-to-br from-brand-800 to-brand-900 border border-brand/30 p-2 flex-shrink-0 overflow-hidden">
        <div className="flex items-center gap-1 mb-1 overflow-hidden">
          <MdAutoAwesome className="text-yellow-300 text-xs flex-shrink-0" />
          <span className="text-white text-[10px] font-semibold truncate">AI Assistant</span>
          <span className="ml-auto flex-shrink-0 text-[8px] bg-yellow-400 text-yellow-900 font-bold px-1 py-0.5 rounded-full">Beta</span>
        </div>
        <p className="text-sidebar-text text-[9px] mb-1.5 leading-tight truncate">Ask about your business</p>
        <button className="w-full bg-brand text-white text-[10px] font-semibold py-1 rounded-lg hover:bg-brand-600 transition-colors flex items-center justify-center gap-1">
          <MdAutoAwesome className="text-xs" />
          Ask Now
        </button>
      </div>
    </aside>
  )
}
