import { MdArrowForward, MdTrendingUp } from 'react-icons/md'

export default function BusinessFunding() {
  return (
    <div className="rounded-xl p-4 animate-fadeIn text-white overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1a56db 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5" />
      <div className="absolute -right-2 bottom-2 w-16 h-16 rounded-full bg-white/5" />

      <div className="relative">
        <p className="text-[11px] font-semibold text-blue-200 mb-1">Need Business Funding?</p>
        <p className="text-[11px] text-blue-100 mb-2 leading-tight">
          You are pre-approved for
        </p>
        <p className="text-xl font-extrabold text-white mb-1">₹35,00,000</p>
        <p className="text-[10px] text-blue-200 mb-3">Get funds in 24 hours</p>

        <div className="flex items-center gap-2">
          <button className="bg-white text-brand text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1">
            Explore Now <MdArrowForward className="text-xs" />
          </button>
          <div className="ml-auto">
            <MdTrendingUp className="text-4xl text-white/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
