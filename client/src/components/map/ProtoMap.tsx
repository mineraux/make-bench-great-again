import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import './map.scss'
import { observer } from "mobx-react-lite";
import Store from "../../store/Store";
import mapboxgl, { GeolocateControl, Map as MapboxGlMap, EventData } from 'mapbox-gl'
import MapManager from "./MapController";
import { featureInFeaturesCoords } from "../../utils/map";
import DirectionsManager from "./DirectionsController";
import GeoLocationManager from "./GeoLocationController";

const ProtoMap: FunctionComponent = () => {

  const { benchList, fetchBenchList } = Store

  let map = useRef<MapboxGlMap | null>(null);
  let directions = useRef(DirectionsManager.initMapboxDirections());
  let geolocate = useRef<GeolocateControl>(GeoLocationManager.initGeolocate())

  const [isTravelInformationOpen, setIsTravelInformationOpen] = useState(false)
  const [benchTargetName, setBenchTargetName] = useState('Nom par défaut')
  const [benchTargetDescription, setBenchTargetDescription] = useState('Description par défaut')
  const [isTourStarted, setIsTourStarted] = useState(false)

  const [markers, setMarkers] = useState()
  const [userLocation, setUserLocation] = useState()
  const [travelTime, setTravelTime] = useState()
  const [travelDistance, setTravelDistance] = useState()

  const getInstallationList = async () => {
    await fetchBenchList({ name: true, description: true, geolocation: true })
  }

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string

    map.current = MapManager.initMapCanvas()
    map.current.addControl(geolocate.current)
    map.current.addControl(directions.current);

    map.current.on('load', function () {
      getInstallationList()
      geolocate.current.trigger()

      map.current!.on('click', function (e) {
        setIsTravelInformationOpen(false)
      })

      map.current!.on('click', 'markers', function (e) {
        if (e.features && featureInFeaturesCoords(e)) {
          map.current!.flyTo({ center: featureInFeaturesCoords(e) });
          setBenchTargetName(e.features[0].properties!.name)
          setBenchTargetDescription(e.features[0].properties!.description)
          setIsTravelInformationOpen(true)
        }
      });

      map.current!.on('mouseenter', 'markers', function () {
        map.current!.getCanvas().style.cursor = 'pointer';
      });

      map.current!.on('mouseleave', 'markers', function () {
        map.current!.getCanvas().style.cursor = '';
      });
    })

    geolocate.current.on('geolocate', function (e: EventData) {
      setUserLocation([e.coords.longitude, e.coords.latitude])
    })

    directions.current.on('route', function (e: EventData) {
      // Returned value is in secondes => conversion to minutes
      setTravelTime(Math.floor(e.route[0].duration / 60))

      // Returned value is in meters => conversion to km
      setTravelDistance((e.route[0].distance / 1000).toFixed(2))
    })

  }, [])

  useEffect(() => {
    if (map.current) {
      const markers = MapManager.setAllMarkers(benchList, map.current)
      setMarkers(markers)
    }
  }, [benchList])

  const getFastestPath = () => {
    DirectionsManager.setFastestPath(directions.current, markers, userLocation)
    setIsTourStarted(true)
  }
  const panelClassName = "mapboxgl-map__travel-informations-panel";
  return (
    <>
      <div id="map">
        <div className={isTravelInformationOpen ? `${panelClassName} open` : panelClassName}>
          <div className="mapboxgl-map__travel-informations-panel__informations--installation">
            <span className="mapboxgl-map__travel-informations-panel__bench-name">{benchTargetName}</span>
            <span className="mapboxgl-map__travel-informations-panel__bench-description">{benchTargetDescription}</span>
          </div>
          <div className="mapboxgl-map__travel-informations-panel__travel-duration">
            {travelTime && travelDistance && <p>Nous vous prévoyons {travelTime} minutes de trajet ({travelDistance} km)</p>}
          </div>
        </div>
        {markers && userLocation && !isTourStarted &&
        <button onClick={getFastestPath} className="mapboxgl-map__btn-start-travel">Commencer la visite</button>
        }
      </div>
    </>
  )
}

export default observer(ProtoMap)