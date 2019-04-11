import * as turf from '@turf/turf'
import { ApiBenchReponseRoot, QueryApiBenchReponse } from '../../@types';
import mapboxgl, { GeolocateControl, Map as MapboxGlMap, Marker } from 'mapbox-gl'

class MapManager {

  public getNearestMarker = (markers: mapboxgl.Marker[] ,userLocation: [number, number])=> {
    let lastDistance = 99999
    let nearestMarker:mapboxgl.Marker = markers[0]
  
    markers.map((marker: mapboxgl.Marker, index: number) => {
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

  public setAllMarkers = (benchList: ApiBenchReponseRoot, map:mapboxgl.Map) => {
    const markers: mapboxgl.Marker[] = []
    benchList.map(bench => {
      let marker = new mapboxgl.Marker().setLngLat(bench.geolocation).addTo(map)
      markers.push(marker)
    })
    return markers
  }

}

export default new MapManager()