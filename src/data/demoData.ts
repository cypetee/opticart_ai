import type { CatalogProduct, Store, StoreOffer } from '../types'

/** Demo anchor: Austin, TX — OSM tiles look realistic for the map MVP */
export const DEMO_CENTER = { lat: 30.2672, lng: -97.7431 }

export const CATALOG: CatalogProduct[] = [
  { id: 'milk', label: 'Milk (1 gal)', aliases: ['milk', 'whole milk', '2% milk', 'dairy milk'] },
  { id: 'eggs', label: 'Eggs (dozen)', aliases: ['eggs', 'egg', 'dozen eggs'] },
  { id: 'bread', label: 'Bread (loaf)', aliases: ['bread', 'loaf', 'sandwich bread'] },
  { id: 'bananas', label: 'Bananas (lb)', aliases: ['bananas', 'banana'] },
  { id: 'chicken', label: 'Chicken breast (lb)', aliases: ['chicken', 'chicken breast', 'boneless chicken'] },
  { id: 'spinach', label: 'Spinach', aliases: ['spinach', 'greens', 'baby spinach'] },
  { id: 'pasta', label: 'Pasta (16 oz)', aliases: ['pasta', 'spaghetti', 'noodles'] },
  { id: 'olive_oil', label: 'Olive oil', aliases: ['olive oil', 'evoo', 'oil'] },
]

export const STORES: Store[] = [
  {
    id: 'budget_mart',
    name: 'Budget Mart',
    chain: 'Budget Mart',
    lat: 30.2712,
    lng: -97.7491,
  },
  {
    id: 'organic_oasis',
    name: 'Organic Oasis Market',
    chain: 'Organic Oasis',
    lat: 30.2625,
    lng: -97.7389,
  },
  {
    id: 'value_foods',
    name: 'Value Foods',
    chain: 'Value Foods',
    lat: 30.275,
    lng: -97.7355,
  },
]

/** Mock “scanner” inventory + prices — simulates what real APIs would return */
export const OFFERS: StoreOffer[] = [
  // Budget Mart — cheap conventional
  { storeId: 'budget_mart', productId: 'milk', brand: 'DairyPure', priceUsd: 3.29, organic: false, unit: 'gal' },
  { storeId: 'budget_mart', productId: 'eggs', brand: 'GoldHen', priceUsd: 2.99, organic: false, unit: 'doz' },
  { storeId: 'budget_mart', productId: 'bread', brand: 'SunRise', priceUsd: 1.99, organic: false, unit: 'loaf' },
  { storeId: 'budget_mart', productId: 'bananas', brand: 'FreshPick', priceUsd: 0.59, organic: false, unit: 'lb' },
  { storeId: 'budget_mart', productId: 'chicken', brand: 'FarmFresh', priceUsd: 4.99, organic: false, unit: 'lb' },
  { storeId: 'budget_mart', productId: 'spinach', brand: 'GreenLeaf', priceUsd: 2.49, organic: false, unit: 'bag' },
  { storeId: 'budget_mart', productId: 'pasta', brand: 'Nonna', priceUsd: 1.29, organic: false, unit: 'box' },
  { storeId: 'budget_mart', productId: 'olive_oil', brand: 'Mediterra', priceUsd: 8.99, organic: false, unit: '750ml' },
  // Organic Oasis — premium / organic
  { storeId: 'organic_oasis', productId: 'milk', brand: 'Horizon Organic', priceUsd: 6.49, organic: true, unit: 'gal' },
  { storeId: 'organic_oasis', productId: 'eggs', brand: 'Vital Farms', priceUsd: 7.99, organic: true, unit: 'doz' },
  { storeId: 'organic_oasis', productId: 'bread', brand: 'Ezekiel', priceUsd: 6.29, organic: true, unit: 'loaf' },
  { storeId: 'organic_oasis', productId: 'bananas', brand: 'Equal Exchange', priceUsd: 0.99, organic: true, unit: 'lb' },
  { storeId: 'organic_oasis', productId: 'chicken', brand: 'Smart Chicken', priceUsd: 8.99, organic: true, unit: 'lb' },
  { storeId: 'organic_oasis', productId: 'spinach', brand: 'Earthbound', priceUsd: 3.99, organic: true, unit: 'clamshell' },
  { storeId: 'organic_oasis', productId: 'pasta', brand: 'Bionaturae', priceUsd: 3.49, organic: true, unit: 'box' },
  { storeId: 'organic_oasis', productId: 'olive_oil', brand: 'Bragg', priceUsd: 14.99, organic: true, unit: '750ml' },
  // Value Foods — mid-tier, a few wins
  { storeId: 'value_foods', productId: 'milk', brand: 'H-E-B', priceUsd: 3.79, organic: false, unit: 'gal' },
  { storeId: 'value_foods', productId: 'eggs', brand: 'Hill Country', priceUsd: 3.49, organic: false, unit: 'doz' },
  { storeId: 'value_foods', productId: 'bread', brand: 'Oroweat', priceUsd: 3.29, organic: false, unit: 'loaf' },
  { storeId: 'value_foods', productId: 'bananas', brand: 'Fresh', priceUsd: 0.49, organic: false, unit: 'lb' },
  { storeId: 'value_foods', productId: 'chicken', brand: 'Tyson', priceUsd: 5.49, organic: false, unit: 'lb' },
  { storeId: 'value_foods', productId: 'spinach', brand: 'Taylor Farms', priceUsd: 2.99, organic: false, unit: 'bag' },
  { storeId: 'value_foods', productId: 'pasta', brand: 'Barilla', priceUsd: 1.79, organic: false, unit: 'box' },
  { storeId: 'value_foods', productId: 'olive_oil', brand: 'Bertolli', priceUsd: 9.49, organic: false, unit: '750ml' },
]
