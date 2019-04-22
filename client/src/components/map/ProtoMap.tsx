import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import './map.scss'
import { observer } from "mobx-react-lite";
import Store from "../../store/Store";
import mapboxgl, { GeolocateControl, Map as MapboxGlMap, EventData } from 'mapbox-gl'
import MapManager from "./MapController";
import { featureInFeaturesCoords } from "../../utils/map";
import DirectionsManager from "./DirectionsController";
import GeoLocationManager from "./GeoLocationController";
import InformationsPanel from "./InformationsPanel";

const ProtoMap: FunctionComponent = () => {

  const { benchList, fetchBenchList } = Store

  let map = useRef<MapboxGlMap | null>(null);
  let directions = useRef(DirectionsManager.initMapboxDirections());
  let geolocate = useRef<GeolocateControl>(GeoLocationManager.initGeolocate())

  const [isTourStarted, setIsTourStarted] = useState(false)

  const [markers, setMarkers] = useState()
  const [userLocation, setUserLocation] = useState()
  const [selectedMarker, setSelectedMarker] = useState()

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

      map.current!.on('click', 'markers', function (e) {
        if (e.features && featureInFeaturesCoords(e)) {
          map.current!.flyTo({ center: featureInFeaturesCoords(e) });
          setSelectedMarker(e.features[0])
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
      // // Returned value is in secondes => conversion to minutes
      setTravelTime(Math.floor(e.route[0].duration / 60))

      // // Returned value is in meters => conversion to km
      setTravelDistance((e.route[0].distance / 1000).toFixed(2))
    })

  }, [])

  useEffect(() => {
    if (map.current) {
      const markers = MapManager.setAllMarkers(benchList, map.current)
      setMarkers(markers)
    }
  }, [benchList])

  const setFastestPath = () => {
    setSelectedMarker(DirectionsManager.setFastestPath(directions.current, markers, userLocation))

    setIsTourStarted(true)
  }

  return (
    <div id="map">
      <InformationsPanel marker={selectedMarker} travelTime={travelTime} travelDistance={travelDistance} />
      {markers && userLocation && !isTourStarted &&
        <button onClick={setFastestPath} className="mapboxgl-map__btn-start-travel">Commencer la visite</button>
      }
    </div>
  )
}

export default observer(ProtoMap)