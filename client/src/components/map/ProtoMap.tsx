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

  const [targetInstallationID, setTargetInstallationID] = useState()

  const [
    isGeolocationPermissionGranted,
    setIsGeolocationPermissionGranted,
  ] = useState(true)

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

    checkNavigatorPermission()
  }, [])

  const checkNavigatorPermission = async () => {
    //@ts-ignore
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
      if (result.state == 'granted') {
        setIsGeolocationPermissionGranted(true)
        geolocate.current.trigger()
      } else if (result.state == 'prompt') {
        setIsGeolocationPermissionGranted(false)
      } else if (result.state == 'denied') {
        setIsGeolocationPermissionGranted(false)
      }
    })
  }

  // useEffect(() => {
  //   /**
  //    * Position d'une instal pour fake le GPS :
  //    * 48,875100
  //    * 2,407654
  //    */
  //   if (isTourStarted) {
  //     DirectionsManager.setPathToInstallation(
  //       directions.current,
  //       featureCoords(selectedMarker),
  //       userLocation
  //     )
  //   }
  // }, [isTourStarted, userLocation])

  useEffect(() => {
    if (map.current && !markers && map.current.isStyleLoaded()) {
      const markers = MapManager.setAllMarkers(installationList, map.current)
      setMarkers(markers)
    }
  }, [installationList])

  useEffect(() => {
    if (travelDistance === 0 || travelTime === 0) {
      console.log('User close to installation')
    }
  }, [travelDistance])

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
    setTargetInstallationID(selectedMarker.properties._id)
    setIsTourStarted(true)
  }

  return (
    <div id="map">
      <div className="mapboxgl-map__mask" />
      {!isGeolocationPermissionGranted && (
        <Modal
          modalTitle="Votre parcours commence !"
          textContent="
        Nous vous proposons de vous diriger vers l’installation la plus proche pour réaliser la performance et débloquer le contenu associé.
        Pour cela nous aurons besoin de votre localisation. 
        "
          buttonLabel="Démarrer"
          onButtonClick={initGeoLocate}
        />
      )}
      {markers && (
        <InformationsPanel
          marker={selectedMarker}
          travelTime={travelTime}
          travelDistance={travelDistance}
          onButtonClick={setPath}
          isTourStarted={isTourStarted}
          userLocation={userLocation}
          targetInstallationID={targetInstallationID}
        />
      )}
    </div>
  )
}

export default observer(ProtoMap)
