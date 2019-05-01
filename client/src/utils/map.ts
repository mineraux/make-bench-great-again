import { LngLat, EventData } from 'mapbox-gl'
import { Coords } from '../@types'

export const featureCoords = (marker: any): Coords => {
  return marker.geometry.coordinates
}

export const featureInFeaturesCoords = (e: EventData): LngLat => {
  return e.features[0].geometry.coordinates
}
