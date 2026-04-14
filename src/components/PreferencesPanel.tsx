import type { PreferenceMode, UserPrefs } from '../types'
import { DEMO_CENTER } from '../data/demoData'

const MODES: { id: PreferenceMode; title: string; hint: string }[] = [
  {
    id: 'lowest_price',
    title: 'Lowest price',
    hint: 'Minimize spend; conventional OK',
  },
  {
    id: 'organic',
    title: 'Organic first',
    hint: 'Prefer organic SKUs, then price',
  },
  {
    id: 'brand_loyal',
    title: 'Brand loyal',
    hint: 'Favor brands matching your hint',
  },
]

interface Props {
  prefs: UserPrefs
  onChange: (p: UserPrefs) => void
}

export function PreferencesPanel({ prefs, onChange }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">De-Choicer preferences</h2>
      <p className="mt-1 text-sm text-slate-600">
        Rule-based picks from demo inventory — simulates your AI agent locally.
      </p>

      <fieldset className="mt-4 space-y-2">
        <legend className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Strategy
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {MODES.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer flex-col rounded-xl border-2 p-3 text-left transition ${
                prefs.mode === m.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name="mode"
                className="sr-only"
                checked={prefs.mode === m.id}
                onChange={() => onChange({ ...prefs, mode: m.id })}
              />
              <span className="font-medium text-slate-900">{m.title}</span>
              <span className="text-xs text-slate-600">{m.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {prefs.mode === 'brand_loyal' && (
        <label className="mt-4 block text-left">
          <span className="text-sm font-medium text-slate-700">Brand hint</span>
          <input
            type="text"
            value={prefs.loyalBrandHint}
            onChange={(e) => onChange({ ...prefs, loyalBrandHint: e.target.value })}
            placeholder="e.g. Barilla, Horizon"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500 focus:ring-2"
          />
        </label>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-left sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Home (lat / lng)</span>
          <div className="mt-1 flex flex-wrap gap-2">
            <input
              type="number"
              step="0.0001"
              value={prefs.home.lat}
              onChange={(e) =>
                onChange({
                  ...prefs,
                  home: { ...prefs.home, lat: Number(e.target.value) },
                })
              }
              className="min-w-[8rem] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Latitude"
            />
            <input
              type="number"
              step="0.0001"
              value={prefs.home.lng}
              onChange={(e) =>
                onChange({
                  ...prefs,
                  home: { ...prefs.home, lng: Number(e.target.value) },
                })
              }
              className="min-w-[8rem] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Longitude"
            />
            <button
              type="button"
              onClick={() =>
                onChange({ ...prefs, home: { ...DEMO_CENTER } })
              }
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Reset to demo
            </button>
          </div>
        </label>
        <label className="block text-left">
          <span className="text-sm font-medium text-slate-700">Budget (USD)</span>
          <input
            type="number"
            min={5}
            step={1}
            value={prefs.budgetUsd}
            onChange={(e) =>
              onChange({ ...prefs, budgetUsd: Number(e.target.value) || 0 })
            }
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <label className="block text-left">
          <span className="text-sm font-medium text-slate-700">Search radius (mi)</span>
          <input
            type="number"
            min={1}
            max={50}
            step={1}
            value={prefs.radiusMiles}
            onChange={(e) =>
              onChange({ ...prefs, radiusMiles: Number(e.target.value) || 1 })
            }
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Radius filter uses straight-line miles from home. Path order is nearest-neighbor
        (fuel/time proxy for MVP).
      </p>
    </section>
  )
}
