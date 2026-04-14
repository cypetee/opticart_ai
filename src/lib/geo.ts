const R_MI = 3959

export function haversineMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R_MI * Math.asin(Math.min(1, Math.sqrt(h)))
}

/** Nearest-neighbor order starting from `start`, visiting all `points` by id */
export function orderByNearestNeighbor(
  start: { lat: number; lng: number },
  points: { id: string; lat: number; lng: number }[],
): string[] {
  const remaining = [...points]
  const order: string[] = []
  let current = start
  while (remaining.length) {
    let bestIdx = 0
    let bestD = Infinity
    remaining.forEach((p, i) => {
      const d = haversineMiles(current, p)
      if (d < bestD) {
        bestD = d
        bestIdx = i
      }
    })
    const next = remaining.splice(bestIdx, 1)[0]
    order.push(next.id)
    current = next
  }
  return order
}
