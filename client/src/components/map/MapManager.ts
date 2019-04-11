import * as turf from '@turf/turf'

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

}

export default new MapManager()