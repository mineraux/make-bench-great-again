import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import './mapgl.scss'
import { observer } from 'mobx-react-lite'
import { InstallationStore } from '../../store'
import mapboxgl, {
  GeolocateControl,
  Map as MapboxGlMap,
  EventData,
} from 'mapbox-gl'
import MapManager from './MapController'
import { featureInFeaturesCoords } from '../../utils/map'
import DirectionsManager from './DirectionsController'
import GeoLocationManager from './GeoLocationController'
import InformationsPanel from '../InformationsPanel/InformationsPanel'
import { featureCoords } from '../../utils/map'
import Modal from '../Modal/Modal'

const ProtoMap: FunctionComponent = () => {
  const { installationList, fetchInstallationList } = InstallationStore

  const map = useRef<MapboxGlMap | null>(null)
  const directions = useRef(DirectionsManager.initMapboxDirections())
  const geolocate = useRef<GeolocateControl>(GeoLocationManager.initGeolocate())

  const [isTourStarted, setIsTourStarted] = useState(false)

  const [markers, setMarkers] = useState()
  const [userLocation, setUserLocation] = useState()
  const [selectedMarker, setSelectedMarker] = useState()

  const [travelTime, setTravelTime] = useState()
  const [travelDistance, setTravelDistance] = useState()

  const getInstallationList = async () => {
    await fetchInstallationList({
      name: true,
      description: true,
      geolocation: true,
    })
  }

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string

    map.current = MapManager.initMapCanvas()
    map.current.addControl(geolocate.current)
    map.current.addControl(directions.current)

    map.current.on('load', () => {
      getInstallationList()

      map.current!.on('click', 'markers', e => {
        if (e.features && featureInFeaturesCoords(e)) {
          map.current!.flyTo({ center: featureInFeaturesCoords(e) })
          setSelectedMarker(e.features[0])
        }
      })

      map.current!.on('mouseenter', 'markers', () => {
        map.current!.getCanvas().style.cursor = 'pointer'
      })

      map.current!.on('mouseleave', 'markers', () => {
        map.current!.getCanvas().style.cursor = ''
      })

      geolocate.current.on('geolocate', (e: EventData) => {
        setUserLocation([e.coords.longitude, e.coords.latitude])
      })

      directions.current.on('route', (e: EventData) => {
        // // Returned value is in secondes => conversion to minutes
        setTravelTime(Math.floor(e.route[0].duration / 60))

        // // Returned value is in meters => conversion to km
        setTravelDistance((e.route[0].distance / 1000).toFixed(2))
      })
    })
  }, [])

  useEffect(() => {
    if (!isTourStarted && userLocation && markers) {
      setFastestPath()
    }
  }, [userLocation, markers])

  useEffect(() => {
    if (map.current && !markers && map.current.isStyleLoaded()) {
      const markers = MapManager.setAllMarkers(installationList, map.current)
      setMarkers(markers)
    }
  }, [installationList])

  const setFastestPath = () => {
    setSelectedMarker(
      DirectionsManager.setFastestPath(
        directions.current,
        markers,
        userLocation
      )
    )
    setIsTourStarted(true)
  }

  const initGeoLocate = () => {
    geolocate.current.trigger()
  }

  const setPath = () => {
    DirectionsManager.setPathToInstallation(
      directions.current,
      featureCoords(selectedMarker),
      userLocation
    )
    setIsTourStarted(true)
  }

  return (
    <div id="map">
      <Modal
        modalTitle="Votre parcours commence !"
        textContent="
        Nous vous proposons de vous diriger vers l’installation la plus proche pour réaliser la performance et débloquer le contenu associé.
        Pour cela nous aurons besoin de votre localisation. 
        "
        buttonLabel="Démarrer"
        onButtonClick={initGeoLocate}
      />
      {markers && userLocation && (
        <InformationsPanel
          marker={selectedMarker}
          travelTime={travelTime}
          travelDistance={travelDistance}
          onButtonClick={setPath}
          isTourStarted={isTourStarted}
        />
      )}
    </div>
  )
}

export default observer(ProtoMap)
