import { useState } from 'react'
import { MdSearch, MdNotifications, MdMessage, MdHelpOutline, MdLogout } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : user?.company
      ? user.company.split(' ').filter(w => /^[A-Z]/.test(w)).map(w => w[0]).join('').slice(0, 2)
      : '?'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 flex-shrink-0">
      {/* Search — takes available space but stops at max-w-xs */}
      <div className="w-80 flex-shrink-0">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search for transactions, invoices, vendors..."
            className="w-full pl-9 pr-14 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-brand focus:bg-white transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] font-medium bg-gray-200 px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </div>
      </div>

      {/* Spacer — pushes everything else to the far right */}
      <div className="flex-1" />

      {/* Action icons — always pinned to far right */}
      <div className="flex items-center gap-1">
        {/* Messages */}
        <button className="relative p-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors">
          <MdMessage className="text-xl" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-brand text-white text-[9px] font-bold rounded-full flex items-center justify-center">12</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors">
          <MdNotifications className="text-xl" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
        </button>

        {/* Help */}
        <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors">
          <MdHelpOutline className="text-xl" />
        </button>

        {/* Divider */}
        <div className="w-px h-7 bg-gray-200 mx-2" />

        {/* User info — company name left of avatar */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(v => !v)}
            className="flex items-center gap-2.5 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors"
          >
            <div className="text-right">
              {user?.company && (
                <p className="text-sm font-semibold text-gray-800 leading-tight whitespace-nowrap">
                  {user.company}
                </p>
              )}
              {user?.gstin && (
                <p className="text-[10px] text-gray-500 whitespace-nowrap">
                  SME • GSTIN {user.gstin}
                </p>
              )}
            </div>
            <div className="w-9 h-9 rounded-full bg-brand text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
              {initials}
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50 min-w-[140px]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <MdLogout className="text-base" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
