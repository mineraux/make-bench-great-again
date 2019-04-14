import * as turf from '@turf/turf'
import { GeolocateControl } from "mapbox-gl";
import { Coords } from "../../@types";
import { featureCoords } from "../../utils/map";

class GeoLocationManager {
  public initGeolocate = () => {
    const geolocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
    })
  
    return geolocate
  }

  public getNearestMarker = (markers: any, userLocation: Coords) => {
    let lastDistance = 99999
    let nearestMarker: any = markers

    markers.map((marker: any) => {      
      const markerCoords:Coords = featureCoords(marker)
      const distance = turf.distance(userLocation, markerCoords)

      if (distance < lastDistance) {
        nearestMarker = marker
      }

      lastDistance = distance
    })
    return nearestMarker
  }
}

export default new GeoLocationManager()

