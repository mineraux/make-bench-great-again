import * as turf from '@turf/turf'
import { ApiBenchReponseRoot, QueryApiBenchReponse } from '../../@types';
import mapboxgl, { GeolocateControl, Map as MapboxGlMap, Marker } from 'mapbox-gl'
// import MapBoxDirections from '@mapbox/mapbox-gl-directions'
var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

class MapManager {

  public initMapCanvas = (container: string, zoom: number, center: [number, number], style: string) => {
    const map = new MapboxGlMap({
      container: container,
      zoom: zoom,
      center: center,
      style: style
    });

    return map
  }

  public getNearestMarker = (markers: mapboxgl.Marker[], userLocation: [number, number]) => {
    let lastDistance = 99999
    let nearestMarker: mapboxgl.Marker = markers[0]

    markers.map((marker: mapboxgl.Marker) => {
      const lngLat = marker.getLngLat()
      const lngLatArr = [lngLat.lng, lngLat.lat]

      const distance = turf.distance(userLocation, lngLatArr)
      if (distance < lastDistance) {
        nearestMarker = marker
      }

      lastDistance = distance
    })
    return nearestMarker
  }

  public setAllMarkers = (benchList: ApiBenchReponseRoot, map: mapboxgl.Map) => {
    const markers: mapboxgl.Marker[] = []
    benchList.map(bench => {
      let marker = new mapboxgl.Marker().setLngLat(bench.geolocation).addTo(map)
      markers.push(marker)
    })
    return markers
  }

  public initMapboxDirections = () => {
    //@ts-ignore
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/walking',
    });

    return directions
  }
}

export default new MapManager()