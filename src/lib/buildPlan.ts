import { CATALOG, OFFERS, STORES } from '../data/demoData'
import type {
  ParsedListItem,
  PlanLine,
  ShoppingPlan,
  Store,
  UserPrefs,
} from '../types'
import { haversineMiles, orderByNearestNeighbor } from './geo'
import { pickOffer } from './deChoicer'

function storeById(id: string): Store | undefined {
  return STORES.find((s) => s.id === id)
}

function labelForProduct(id: string): string {
  return CATALOG.find((c) => c.id === id)?.label ?? id
}

/** Baseline: buy everything at the worst single store (max total) among stores in radius */
function baselineSingleStoreWorst(
  items: { productId: string; quantity: number }[],
  storesInRadius: Store[],
): number {
  if (!storesInRadius.length) return 0
  let worst = 0
  for (const st of storesInRadius) {
    let total = 0
    let ok = true
    for (const it of items) {
      const o = OFFERS.find((x) => x.storeId === st.id && x.productId === it.productId)
      if (!o) {
        ok = false
        break
      }
      total += o.priceUsd * it.quantity
    }
    if (ok) worst = Math.max(worst, total)
  }
  return worst
}

export function buildShoppingPlan(
  parsed: ParsedListItem[],
  prefs: UserPrefs,
): ShoppingPlan {
  const notes: string[] = []
  const resolved = parsed.filter((p) => p.productId)
  const items = resolved.map((p) => ({
    productId: p.productId as string,
    quantity: Math.max(1, p.quantity),
  }))

  if (!items.length) {
    return {
      lines: [],
      storesToVisit: [],
      routeOrder: [],
      totalUsd: 0,
      singleStoreBaselineUsd: 0,
      savingsVsBaselinePct: 0,
      withinBudget: true,
      notes: ['No recognized items — try keywords like milk, eggs, bread, bananas.'],
    }
  }

  const storesInRadius = STORES.filter(
    (s) => haversineMiles(prefs.home, s) <= prefs.radiusMiles,
  )

  if (!storesInRadius.length) {
    notes.push('No stores within your radius — increase radius or move the pin.')
    return {
      lines: [],
      storesToVisit: [],
      routeOrder: [],
      totalUsd: 0,
      singleStoreBaselineUsd: 0,
      savingsVsBaselinePct: 0,
      withinBudget: false,
      notes,
    }
  }

  const lines: PlanLine[] = []
  for (const it of items) {
    const candidates = OFFERS.filter(
      (o) =>
        o.productId === it.productId &&
        storesInRadius.some((s) => s.id === o.storeId),
    )
    const chosen = pickOffer(candidates, prefs)
    if (!chosen) {
      notes.push(`No offer in radius for “${labelForProduct(it.productId)}”.`)
      continue
    }
    lines.push({
      productId: it.productId,
      label: labelForProduct(it.productId),
      quantity: it.quantity,
      chosen,
      subtotalUsd: chosen.priceUsd * it.quantity,
    })
  }

  const storeIds = [...new Set(lines.map((l) => l.chosen.storeId))]
  const storesToVisit = storeIds
    .map((id) => storeById(id))
    .filter((s): s is Store => Boolean(s))

  const routeOrder = orderByNearestNeighbor(
    prefs.home,
    storesToVisit.map((s) => ({ id: s.id, lat: s.lat, lng: s.lng })),
  )

  const totalUsd = lines.reduce((s, l) => s + l.subtotalUsd, 0)
  const baseline = baselineSingleStoreWorst(items, storesInRadius)
  const savingsVsBaselinePct =
    baseline > 0 && totalUsd < baseline
      ? Math.round(((baseline - totalUsd) / baseline) * 100)
      : 0

  const withinBudget = totalUsd <= prefs.budgetUsd
  if (!withinBudget) {
    notes.push(
      `Plan total $${totalUsd.toFixed(2)} exceeds budget $${prefs.budgetUsd.toFixed(2)}.`,
    )
  }

  notes.push(
    'Prices are demo data only — use “Report price change” to simulate crowdsourcing.',
  )

  return {
    lines,
    storesToVisit,
    routeOrder,
    totalUsd,
    singleStoreBaselineUsd: baseline,
    savingsVsBaselinePct,
    withinBudget,
    notes,
  }
}
