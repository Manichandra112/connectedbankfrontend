// Real logo URLs for each integration
const integrations = [
  {
    label: 'Tally',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Tally_Solutions_Logo.svg/120px-Tally_Solutions_Logo.svg.png',
    fallbackBg: '#1a237e',
    fallbackText: 'T',
  },
  {
    label: 'Zoho Books',
    logoUrl: 'https://www.zohowebstatic.com/sites/zweb/images/commonroot/zoho-logo-web.svg',
    fallbackBg: '#e65100',
    fallbackText: 'Z',
  },
  {
    label: 'Busy',
    logoUrl: 'https://busywin.com/wp-content/uploads/2022/09/busy-logo.png',
    fallbackBg: '#1b5e20',
    fallbackText: 'Bu',
  },
  {
    label: 'Marg ERP',
    logoUrl: 'https://margerp.com/wp-content/uploads/2020/08/marg-erp-logo.png',
    fallbackBg: '#b71c1c',
    fallbackText: 'M',
  },
  {
    label: 'GST Portal',
    logoUrl: 'https://www.gst.gov.in/Images/gst-logo.png',
    fallbackBg: '#004d40',
    fallbackText: 'G',
  },
  {
    label: 'Bank Statement',
    logoUrl: null,
    fallbackBg: '#37474f',
    fallbackText: '🏦',
  },
]

function IntegrationIcon({ item }) {
  if (item.logoUrl) {
    return (
      <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow p-1.5">
        <img
          src={item.logoUrl}
          alt={item.label}
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback to colored avatar if image fails
            e.target.style.display = 'none'
            e.target.parentElement.style.backgroundColor = item.fallbackBg
            e.target.parentElement.innerHTML = `<span style="color:white;font-weight:700;font-size:13px">${item.fallbackText}</span>`
          }}
        />
      </div>
    )
  }

  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:shadow-md transition-shadow"
      style={{ backgroundColor: item.fallbackBg }}
    >
      {item.fallbackText}
    </div>
  )
}

export default function ShortcutsBar() {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 animate-fadeIn h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800">Shortcuts &amp; Integrations</h2>
        <button className="text-xs text-brand font-medium hover:underline">Manage</button>
      </div>

      {/* Single horizontal row — all 6 icons evenly fill full width */}
      <div className="flex items-center w-full flex-1">
        {integrations.map((item) => (
          <button
            key={item.label}
            className="flex-1 flex flex-col items-center gap-1.5 group hover:-translate-y-0.5 transition-transform"
          >
            <IntegrationIcon item={item} />
            <span className="text-[9.5px] text-gray-500 font-medium text-center leading-tight w-full truncate px-1">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
