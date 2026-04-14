export type PreferenceMode = 'organic' | 'lowest_price' | 'brand_loyal'

export interface UserPrefs {
  mode: PreferenceMode
  /** Used when mode is brand_loyal */
  loyalBrandHint: string
  budgetUsd: number
  radiusMiles: number
  /** Home / start point for routing */
  home: { lat: number; lng: number }
}

export interface Store {
  id: string
  name: string
  lat: number
  lng: number
  chain: string
}

/** One purchasable SKU at a store */
export interface StoreOffer {
  storeId: string
  productId: string
  brand: string
  priceUsd: number
  organic: boolean
  unit: string
}

export interface CatalogProduct {
  id: string
  label: string
  aliases: string[]
}

export interface ParsedListItem {
  raw: string
  productId: string | null
  quantity: number
}

export interface PlanLine {
  productId: string
  label: string
  quantity: number
  chosen: StoreOffer
  subtotalUsd: number
}

export interface ShoppingPlan {
  lines: PlanLine[]
  storesToVisit: Store[]
  routeOrder: string[]
  totalUsd: number
  singleStoreBaselineUsd: number
  savingsVsBaselinePct: number
  withinBudget: boolean
  notes: string[]
}
