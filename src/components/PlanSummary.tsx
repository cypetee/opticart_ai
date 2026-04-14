import type { ParsedListItem, ShoppingPlan } from '../types'
import { STORES } from '../data/demoData'

interface Props {
  parsed: ParsedListItem[]
  plan: ShoppingPlan | null
}

export function PlanSummary({ parsed, plan }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Parsed list
        </h3>
        <ul className="mt-3 divide-y divide-slate-100">
          {parsed.map((p, i) => (
            <li key={i} className="flex justify-between py-2 text-sm">
              <span className="text-slate-800">
                {p.quantity > 1 ? `${p.quantity}× ` : ''}
                {p.raw}
              </span>
              {p.productId ? (
                <span className="text-emerald-600">matched</span>
              ) : (
                <span className="text-amber-600">unmatched</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {plan && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Mission plan
          </h3>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Total</dt>
              <dd className="text-lg font-semibold text-slate-900">
                ${plan.totalUsd.toFixed(2)}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">vs. worst single-store</dt>
              <dd className="text-lg font-semibold text-emerald-600">
                {plan.savingsVsBaselinePct > 0
                  ? `−${plan.savingsVsBaselinePct}%`
                  : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Budget</dt>
              <dd className={plan.withinBudget ? 'text-slate-900' : 'text-red-600'}>
                {plan.withinBudget ? 'Within budget' : 'Over budget'}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Stores</dt>
              <dd className="text-slate-900">{plan.storesToVisit.length}</dd>
            </div>
          </dl>

          <ul className="mt-4 space-y-2">
            {plan.lines.map((l) => {
              const st = STORES.find((s) => s.id === l.chosen.storeId)
              return (
                <li
                  key={`${l.productId}-${l.chosen.storeId}`}
                  className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
                >
                  <div className="font-medium text-slate-900">
                    {l.quantity}× {l.label}
                  </div>
                  <div className="text-slate-600">
                    {l.chosen.brand}
                    {l.chosen.organic ? ' · organic' : ''} @ {st?.name ?? l.chosen.storeId}{' '}
                    — ${l.subtotalUsd.toFixed(2)}
                  </div>
                </li>
              )
            })}
          </ul>

          {plan.notes.length > 0 && (
            <ul className="mt-4 list-disc pl-5 text-xs text-slate-500">
              {plan.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  )
}
