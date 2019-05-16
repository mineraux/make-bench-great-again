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
      attributionControl: false,
    })
    return map
  }

  public setAllMarkers = (
    installationList: ApiInstallationReponseRoot,
    map: mapboxgl.Map,
    id?: 'string'
  ) => {
    const markers: Feature[] = []

    if (installationList.length === 0) {
      return
    }

    let feature: Feature

    installationList.map(installation => {
      if (id && installation._id == id) {
        feature = {
          type: 'Feature',
          properties: {
            _id: installation._id,
            name: installation.name,
            description: installation.description,
            focus: 'true',
          },
          geometry: {
            type: 'Point',
            coordinates: installation.geolocation as number[],
          },
        }
      } else {
        feature = {
          type: 'Feature',
          properties: {
            _id: installation._id,
            name: installation.name,
            description: installation.description,
            focus: 'false',
          },
          geometry: {
            type: 'Point',
            coordinates: installation.geolocation as number[],
          },
        }
      }

      markers.push(feature)
    })
    map.addSource('markersSource', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: markers,
      },
    })
    map.addLayer({
      id: 'markers',
      type: 'circle',
      source: 'markersSource',
      paint: {
        'circle-radius': {
          base: 20,
          stops: [[10, 10], [20, 20]],
        },
        'circle-color': [
          'match',
          ['get', 'focus'],
          'true',
          '#61f984',
          '#1d1899',
        ],
        'circle-stroke-width': 3,
        'circle-stroke-color': '#61f984',
      },
    })

    return markers
  }
}

export default new MapManager()
