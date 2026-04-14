import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import type { Store } from '../types'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

interface Props {
  home: { lat: number; lng: number }
  stores: Store[]
  routeOrder: string[]
}

export function RouteMap({ home, stores, routeOrder }: Props) {
  useEffect(() => {
    return () => {
      // Leaflet map cleanup handled by unmount
    }
  }, [])

  const storeMap = useMemo(() => new Map(stores.map((s) => [s.id, s])), [stores])

  const orderedStores = routeOrder
    .map((id) => storeMap.get(id))
    .filter((s): s is Store => Boolean(s))

  const path: [number, number][] = [
    [home.lat, home.lng],
    ...orderedStores.map((s) => [s.lat, s.lng] as [number, number]),
  ]

  const center: [number, number] =
    orderedStores.length > 0
      ? [
          (home.lat + orderedStores.reduce((a, s) => a + s.lat, 0)) /
            (orderedStores.length + 1),
          (home.lng + orderedStores.reduce((a, s) => a + s.lng, 0)) /
            (orderedStores.length + 1),
        ]
      : [home.lat, home.lng]

  return (
    <div className="h-[320px] w-full overflow-hidden rounded-xl border border-slate-200 sm:h-[400px]">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[home.lat, home.lng]}>
          <Popup>Start / home</Popup>
        </Marker>
        {orderedStores.map((s) => (
          <Marker key={s.id} position={[s.lat, s.lng]}>
            <Popup>
              <strong>{s.name}</strong>
              <br />
              {s.chain}
            </Popup>
          </Marker>
        ))}
        {path.length > 1 && (
          <Polyline positions={path} pathOptions={{ color: '#059669', weight: 4, opacity: 0.85 }} />
        )}
      </MapContainer>
    </div>
  )
}
