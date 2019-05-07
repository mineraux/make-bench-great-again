import { ApiBenchReponseRoot, Coords } from '../../@types'
import mapboxgl, { Map as MapboxGlMap } from 'mapbox-gl'
import { Feature } from 'geojson'

class MapManager {
  public initMapCanvas = () => {
    const map = new MapboxGlMap({
      container: 'map',
      zoom: 15,
      center: [2.40592, 48.8757],
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
    })
    return map
  }

  public setAllMarkers = (
    benchList: ApiBenchReponseRoot,
    map: mapboxgl.Map
  ) => {
    const markers: Feature[] = []

    if (benchList.length === 0) {
      return
    }

    benchList.map(bench => {
      const feature: Feature = {
        type: 'Feature',
        properties: {
          _id: bench._id,
          name: bench.name,
          description: bench.description,
        },
        geometry: {
          type: 'Point',
          coordinates: bench.geolocation as number[],
        },
      }

      markers.push(feature)
    })
    map.addLayer({
      id: 'markers',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: markers,
        },
      },
      layout: {
        'icon-image': 'rocket-15',
      },
    })

    return markers
  }
}

export default new MapManager()
