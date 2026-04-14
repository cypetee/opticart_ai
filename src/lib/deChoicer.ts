import type { PreferenceMode, StoreOffer, UserPrefs } from '../types'

function normalizeBrand(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '')
}

/**
 * Ranks offers for one product; first element is the De-Choicer pick.
 * MVP: rule-based “agent” — no external LLM (matches local-only requirement).
 */
export function rankOffersForProduct(
  offers: StoreOffer[],
  mode: PreferenceMode,
  loyalBrandHint: string,
): StoreOffer[] {
  const hint = normalizeBrand(loyalBrandHint)
  const scored = offers.map((o) => {
    let score = 0
    if (mode === 'lowest_price') {
      score = 1_000_000 - Math.round(o.priceUsd * 100)
    } else if (mode === 'organic') {
      score = o.organic ? 500_000 : 0
      score += 100_000 - Math.round(o.priceUsd * 100)
    } else {
      // brand_loyal
      const b = normalizeBrand(o.brand)
      if (hint && b.includes(hint)) score += 800_000
      else if (hint && hint.length >= 3 && b.includes(hint.slice(0, 4))) score += 400_000
      score += 50_000 - Math.round(o.priceUsd * 50)
    }
    return { o, score }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.map((s) => s.o)
}

export function pickOffer(
  offers: StoreOffer[],
  prefs: UserPrefs,
): StoreOffer | null {
  if (!offers.length) return null
  const ranked = rankOffersForProduct(offers, prefs.mode, prefs.loyalBrandHint)
  return ranked[0] ?? null
}
