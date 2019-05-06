// import MapBoxDirections from '@mapbox/mapbox-gl-directions'
var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions')
import mapboxgl from 'mapbox-gl'
import { featureCoords } from '../../utils/map'
import GeoLocationManager from './GeoLocationController'
import { Coords } from '../../@types'
import { Feature } from 'geojson'
import style from './DirectionsStyles'

class DirectionsManager {
  public initMapboxDirections = () => {
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      styles: style,
      unit: 'metric',
      profile: 'mapbox/walking',
      controls: false,
      interactive: false,
    })

    return directions
  }

  public setFastestPath = (
    directions: any,
    markers: Feature[],
    userLocation: Coords
  ): Feature => {
    const nearestMarker = GeoLocationManager.getNearestMarker(
      markers,
      userLocation
    )
    const nearestMarkerCoords = featureCoords(nearestMarker)

    directions.setOrigin(userLocation)
    directions.setDestination(nearestMarkerCoords)

    return nearestMarker
  }

  public setPathToInstallation = (
    directions: any,
    userLocation: Coords,
    marker: Feature
  ) => {
    console.log('directions: ' + directions)
    console.log('userlocation: ' + userLocation)
    console.log('marker :' + marker)

    // directions.setOrigin(userLocation)
    // directions.setDestination(featureCoords(marker))
  }
}

export default new DirectionsManager()
