import { useCallback, useMemo, useState } from 'react'
import { MapPin, Sparkles } from 'lucide-react'
import { DEMO_CENTER } from './data/demoData'
import type { ParsedListItem, ShoppingPlan, UserPrefs } from './types'
import { buildShoppingPlan } from './lib/buildPlan'
import { parseGroceryText } from './services/mockApi'
import { PreferencesPanel } from './components/PreferencesPanel'
import { MultimodalInput } from './components/MultimodalInput'
import { PlanSummary } from './components/PlanSummary'
import { RouteMap } from './components/RouteMap'
import { ReportPriceButton } from './components/ReportPriceButton'

const defaultPrefs: UserPrefs = {
  mode: 'lowest_price',
  loyalBrandHint: 'Barilla',
  budgetUsd: 75,
  radiusMiles: 8,
  home: { ...DEMO_CENTER },
}

const SAMPLE_LIST =
  'milk, eggs, 2x bread, bananas, chicken breast, spinach'

function App() {
  const [prefs, setPrefs] = useState<UserPrefs>(defaultPrefs)
  const [parsed, setParsed] = useState<ParsedListItem[]>(() =>
    parseGroceryText(SAMPLE_LIST),
  )
  const [plan, setPlan] = useState<ShoppingPlan | null>(() =>
    buildShoppingPlan(parseGroceryText(SAMPLE_LIST), defaultPrefs),
  )

  const runOptimizer = useCallback(() => {
    setPlan(buildShoppingPlan(parsed, prefs))
  }, [parsed, prefs])

  const mapPlan = useMemo(() => plan, [plan])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Local MVP
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">OptiCart</h1>
            <p className="mt-1 max-w-xl text-sm text-slate-600">
              From messy list to optimized multi-store mission — demo data, runs entirely in
              your browser.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ReportPriceButton />
            <button
              type="button"
              onClick={runOptimizer}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              <Sparkles className="h-4 w-4" />
              Build mission plan
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
        <PreferencesPanel prefs={prefs} onChange={setPrefs} />

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-950">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <strong>Demo stores</strong> sit near Austin, TX on the map. Set{' '}
              <em>Home (lat / lng)</em> above to your location; increase radius if no stores
              match.
            </div>
          </div>
        </div>

        <MultimodalInput onParsed={setParsed} />

        <PlanSummary parsed={parsed} plan={mapPlan} />

        {mapPlan && mapPlan.storesToVisit.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Path planner</h2>
            <p className="mt-1 text-sm text-slate-600">
              Visit order is nearest-neighbor from home through selected stores (fuel/time proxy).
              Tiles © OpenStreetMap contributors.
            </p>
            <div className="mt-4">
              <RouteMap
                home={prefs.home}
                stores={mapPlan.storesToVisit}
                routeOrder={mapPlan.routeOrder}
              />
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        OptiCart v1 — dummy APIs &amp; inventory for local prototyping.
      </footer>
    </div>
  )
}

export default App
