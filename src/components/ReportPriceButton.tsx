import { useState } from 'react'
import { Flag } from 'lucide-react'

/**
 * Mitigation for “stale price” risk — MVP logs to console + toast state (no backend).
 */
export function ReportPriceButton() {
  const [sent, setSent] = useState(false)

  return (
    <button
      type="button"
      onClick={() => {
        setSent(true)
        console.info(
          '[OptiCart] Report price change — would POST to /api/price-reports in production',
        )
        setTimeout(() => setSent(false), 2500)
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
    >
      <Flag className="h-4 w-4" />
      {sent ? 'Thanks — logged (demo)' : 'Report price change'}
    </button>
  )
}
