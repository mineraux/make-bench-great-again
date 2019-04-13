import * as turf from '@turf/turf'
import { ApiBenchReponseRoot, Coords } from '../../@types';
import mapboxgl, { GeolocateControl, Map as MapboxGlMap, Marker } from 'mapbox-gl'
import { featureCoords } from '../../utils/map';
// import MapBoxDirections from '@mapbox/mapbox-gl-directions'
var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

class MapManager {

  public initMapCanvas = (container: string, zoom: number, center: Coords, style: string) => {
    const map = new MapboxGlMap({
      container: container,
      zoom: zoom,
      center: center,
      style: style
    });

    return map
  }

  public initMapboxDirections = () => {
    
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/walking',
      controls: false,
      interactive: false
    });

    return directions
  }

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

  public setAllMarkers = (benchList: ApiBenchReponseRoot, map: mapboxgl.Map) => {
    const markers: any = []

    benchList.map(bench => {
      const feature = {
        "type": "Feature",
        "properties": {
          "name": bench.name,
          "description": bench.description
        },
        "geometry": {
          "type": "Point",
          "coordinates": bench.geolocation
        }
      }
        markers.push(feature)
      })

      if (benchList.length > 0) {
        map.addLayer({
          "id": "markers",
          "type": "symbol",
          //@ts-ignore
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": markers
            }
          },
          "layout": {
            "icon-image": "rocket-15"
          }
        });
      }
      
      return markers
  }
}

export default new MapManager()