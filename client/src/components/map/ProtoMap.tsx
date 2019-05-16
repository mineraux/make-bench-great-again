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

  // const map = useRef<MapboxGlMap | null>(null)
  const directions = useRef(DirectionsManager.initMapboxDirections())
  const geolocate = useRef<GeolocateControl>(GeoLocationManager.initGeolocate())

  const [map, setMap] = useState()

  const [isTourStarted, setIsTourStarted] = useState(false)

  const [markers, setMarkers] = useState()
  const [userLocation, setUserLocation] = useState()
  const [selectedMarker, setSelectedMarker] = useState()

  const [travelTime, setTravelTime] = useState()
  const [travelDistance, setTravelDistance] = useState()

  const [targetInstallationID, setTargetInstallationID] = useState()

  const [isMapLoaded, setIsMapLoaded] = useState(false)

  const [mapStylesLoaded, setMapStylesLoaded] = useState(false)

  const [
    isGeolocationPermissionGranted,
    setIsGeolocationPermissionGranted,
  ] = useState(localStorage.getItem('geolocateGranted'))

  useEffect(() => {
    const getInstallationList = () => {
      fetchInstallationList({
        name: true,
        description: true,
        geolocation: true,
      })
    }

    getInstallationList()

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string
    setMap(MapManager.initMapCanvas())
  }, [])

  useEffect(() => {
    if (map) {
      map.addControl(geolocate.current)
      map.addControl(directions.current)
      map.on('load', () => {
        setIsMapLoaded(true)

        map.on('styledata', () => {
          if (map.isStyleLoaded()) {
            setMapStylesLoaded(true)
          }
        })
      })
    }

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [map])

  useEffect(() => {
    if (
      map &&
      isMapLoaded &&
      installationList.length > 0 &&
      mapStylesLoaded &&
      !markers
    ) {
      const onClickMarker = (e: any) => {
        if (e.features && featureInFeaturesCoords(e)) {
          map.flyTo({ center: featureInFeaturesCoords(e) })
          setSelectedMarker(e.features[0])

          if (map.getLayer('markers')) {
            map.removeLayer('markers')
            map.removeSource('markersSource')
          } else if (map.getLayer('markers-focus')) {
            map.removeLayer('markers-focus')
            map.removeSource('markers-focus-sources')
          }

          const markers = MapManager.setAllMarkers(
            installationList,
            map,
            e.features[0].properties!._id
          )
          setMarkers(markers)
        }
      }

      const markers = MapManager.setAllMarkers(installationList, map)
      setMarkers(markers)

      map.on('click', 'markers', (e: any) => {
        onClickMarker(e)
      })

      map.on('click', 'markers-focus', (e: any) => {
        onClickMarker(e)
      })

      map.on('mouseenter', 'markers', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'markers', () => {
        map.getCanvas().style.cursor = ''
      })

      geolocate.current.on('geolocate', (e: EventData) => {
        setUserLocation([e.coords.longitude, e.coords.latitude])
        localStorage.setItem('geolocateGranted', 'true')
        setIsGeolocationPermissionGranted('true')
      })

      geolocate.current.on('error', (e: PositionError) => {
        localStorage.setItem('geolocateGranted', 'false')
        setIsGeolocationPermissionGranted('false')
      })

      directions.current.on('route', (e: EventData) => {
        // // Returned value is in secondes => conversion to minutes
        setTravelTime(Math.floor(e.route[0].duration / 60))

        // // Returned value is in meters => conversion to km
        setTravelDistance((e.route[0].distance / 1000).toFixed(2))
      })
    }
  }, [map, isMapLoaded, installationList, markers, mapStylesLoaded])

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
      {(!isGeolocationPermissionGranted ||
        isGeolocationPermissionGranted === 'false') && (
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
