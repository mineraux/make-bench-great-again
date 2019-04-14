import { ApiBenchReponseRoot, Coords } from '../../@types';
import mapboxgl, { Map as MapboxGlMap } from 'mapbox-gl'
import { Feature } from 'geojson';

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

  public setAllMarkers = (benchList: ApiBenchReponseRoot, map: mapboxgl.Map) => {
    const markers: Feature[] = []

    if (benchList.length === 0) return

    benchList.map(bench => {
      const feature: Feature = {
        "type": "Feature",
        "properties": {
          "name": bench.name,
          "description": bench.description
        },
        "geometry": {
          "type": "Point",
          "coordinates": bench.geolocation as number[]
        }
      }

      markers.push(feature)
    })
    map.addLayer({
      "id": "markers",
      "type": "symbol",
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

    return markers
  }
}

export default new MapManager()