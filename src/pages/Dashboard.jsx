import { useEffect, useState } from 'react'
import { MdAutoAwesome, MdDownload, MdUpload } from 'react-icons/md'
import { TbBuildingBank } from 'react-icons/tb'
import { useAuth } from '../context/AuthContext'
import {
  getDashboardSummary, getAccounts, getCashFlow,
  getTopReceivables, getTopPayables, getAlerts,
  getHealthScore, getInsights
} from '../services/api'

import KPICard        from '../components/dashboard/KPICard'
import CashFlowChart  from '../components/dashboard/CashFlowChart'
import AccountSummary from '../components/dashboard/AccountSummary'
import TopReceivables from '../components/dashboard/TopReceivables'
import TopPayables    from '../components/dashboard/TopPayables'
import HealthScore    from '../components/dashboard/HealthScore'
import QuickActions   from '../components/dashboard/QuickActions'
import AlertsPanel    from '../components/dashboard/AlertsPanel'
import AIInsights     from '../components/dashboard/AIInsights'
import BusinessFunding from '../components/dashboard/BusinessFunding'
import ShortcutsBar   from '../components/dashboard/ShortcutsBar'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { user } = useAuth()
  const [summary, setSummary]           = useState(null)
  const [accounts, setAccounts]         = useState([])
  const [cashFlow, setCashFlow]         = useState([])
  const [receivables, setReceivables]   = useState({ parties: [], total: 0 })
  const [payables, setPayables]         = useState({ parties: [], total: 0 })
  const [alerts, setAlerts]             = useState([])
  const [health, setHealth]             = useState({ score: 78, label: 'Good' })
  const [insights, setInsights]         = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    Promise.allSettled([
      getDashboardSummary(),
      getAccounts(),
      getCashFlow(),
      getTopReceivables(),
      getTopPayables(),
      getAlerts(),
      getHealthScore(),
      getInsights(),
    ]).then(([sum, acc, cf, recv, pay, al, hs, ins]) => {
      if (sum.status === 'fulfilled')  setSummary(sum.value.data)
      if (acc.status === 'fulfilled')  setAccounts(acc.value.data)
      if (cf.status  === 'fulfilled')  setCashFlow(cf.value.data)
      if (recv.status === 'fulfilled') setReceivables(recv.value.data)
      if (pay.status  === 'fulfilled') setPayables(pay.value.data)
      if (al.status   === 'fulfilled') setAlerts(al.value.data)
      if (hs.status   === 'fulfilled') setHealth(hs.value.data)
      if (ins.status  === 'fulfilled') setInsights(ins.value.data)
      setLoading(false)
    })
  }, [])

  // Compute cashflow totals
  const totalInflow  = cashFlow.reduce((s, d) => s + parseFloat(d.inflow  || 0), 0)
  const totalOutflow = cashFlow.reduce((s, d) => s + parseFloat(d.outflow || 0), 0)

  return (
    <div className="p-4 space-y-4 animate-fadeIn">
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {getGreeting()}{user?.name ? `, ${user.name}` : ''} 👋
          </h1>
          {/* Company info strip — only shown when backend has returned user data */}
          {user?.company && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-semibold text-gray-700">
                {user.company}
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">
                SME
              </span>
              {user?.gstin && (
                <span className="text-xs text-gray-400 font-mono">
                  GSTIN {user.gstin}
                </span>
              )}
            </div>
          )}
          <p className="text-xs text-gray-400 mt-0.5">Here's what's happening with your business today.</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium text-brand border border-brand/30 px-3 py-1.5 rounded-lg hover:bg-brand/5 transition-colors">
          <MdAutoAwesome className="text-sm" />
          Customize Dashboard
        </button>
      </div>


      {/* Main grid layout */}
      <div className="flex gap-4">
        {/* ── Left + Middle (3 column flex-1) */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* KPI Strip */}
          <div className="grid grid-cols-4 gap-3">
            <KPICard
              title="Total Balance"
              value={summary?.totalBalance}
              subtitle={`Across ${summary?.accountCount || 6} accounts`}
              icon={TbBuildingBank}
              iconBg="bg-blue-50"
              iconColor="text-brand"
            />
            <KPICard
              title="Today's Collections"
              value={summary?.todayCollections}
              change={summary?.collectionsChangePercent}
              changeUp={summary?.collectionsUp}
              icon={MdDownload}
              iconBg="bg-green-50"
              iconColor="text-success"
            />
            <KPICard
              title="Today's Payments"
              value={summary?.todayPayments}
              change={summary?.paymentsChangePercent}
              changeUp={summary?.paymentsUp}
              icon={MdUpload}
              iconBg="bg-red-50"
              iconColor="text-danger"
            />
            <KPICard
              title="Working Capital Limit"
              value={summary?.wcLimit}
              extra={summary ? {
                used: summary.wcUsed,
                percent: summary.wcUtilizationPercent,
              } : undefined}
            />
          </div>

          {/* Cash Flow + Account Summary — same height via items-stretch */}
          <div className="grid grid-cols-3 gap-4 items-stretch">
            <div className="col-span-2 flex flex-col">
              <CashFlowChart
                data={cashFlow}
                totalInflow={totalInflow}
                totalOutflow={totalOutflow}
              />
            </div>
            <div className="flex flex-col">
              <AccountSummary accounts={accounts} />
            </div>
          </div>

          {/* Receivables + Payables + Health Score */}
          <div className="grid grid-cols-3 gap-4">
            <TopReceivables data={receivables.parties} total={receivables.total} />
            <TopPayables    data={payables.parties}    total={payables.total} />
            <HealthScore
              score={health.score}
              label={health.label}
              description={health.description}
              explanation={health.explanation}
            />
          </div>
        </div>

        {/* ── Right panel (fixed width) */}
        <div className="w-64 flex-shrink-0 space-y-4">
          <QuickActions />
          <AlertsPanel alerts={alerts} />
          <BusinessFunding />
        </div>
      </div>

      {/* AI Insights + Shortcuts — 60/40 split */}
      <div className="grid gap-4" style={{ gridTemplateColumns: '3fr 2fr' }}>
        <AIInsights insights={insights} />
        <ShortcutsBar />
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-gray-400 py-2">
        © 2024 ConnectBank. All rights reserved.
      </p>
    </div>
  )
}
