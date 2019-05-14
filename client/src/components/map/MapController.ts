import { ApiInstallationReponseRoot, Coords } from '../../@types'
import mapboxgl, { Map as MapboxGlMap } from 'mapbox-gl'
import { Feature } from 'geojson'

class MapManager {
  public initMapCanvas = () => {
    const map = new MapboxGlMap({
      container: 'map',
      zoom: 15,
      center: [2.40592, 48.8757],
      style: 'mapbox://styles/manonc/cjv267i2a04fm1fpj6vt354xd',
    })
    return map
  }

  public setAllMarkers = (
    installationList: ApiInstallationReponseRoot,
    map: mapboxgl.Map
  ) => {
    const markers: Feature[] = []

    if (installationList.length === 0) {
      return
    }

    installationList.map(installation => {
      const feature: Feature = {
        type: 'Feature',
        properties: {
          _id: installation._id,
          name: installation.name,
          description: installation.description,
        },
        geometry: {
          type: 'Point',
          coordinates: installation.geolocation as number[],
        },
      }

      markers.push(feature)
    })
    map.addLayer({
      id: 'markers',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: markers,
        },
      },
      paint: {
        'circle-radius': {
          base: 1.75,
          stops: [[0, 0], [20, 20]],
        },
        'circle-color': '#61f984',
      },
    })

    return markers
  }
}

export default new MapManager()
