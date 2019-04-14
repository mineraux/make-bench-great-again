import * as turf from '@turf/turf'
import { GeolocateControl } from "mapbox-gl";
import { Coords } from "../../@types";
import { featureCoords } from "../../utils/map";
import { Feature } from 'geojson';

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

  public getNearestMarker = (markers: Feature[], userLocation: Coords) => {
    let lastDistance = 99999
    let nearestMarker: Feature = markers[0]

    markers.map((marker: Feature) => {
      const markerCoords: Coords = featureCoords(marker)
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

