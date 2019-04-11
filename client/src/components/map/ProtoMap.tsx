import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import './map.scss'
import { observer } from "mobx-react-lite";
import Store from "../../store/Store";
import mapboxgl, { GeolocateControl, Map as MapboxGlMap, Marker } from 'mapbox-gl'
import MapManager from "./MapManager";
// import MapBoxDirections from '@mapbox/mapbox-gl-directions'
var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

const ProtoMap: FunctionComponent = () => {

  const { benchList, fetchBenchList } = Store

  let map = useRef<MapboxGlMap | null>(null);
  let directions = useRef(null);
  let geolocate = useRef<GeolocateControl | null>(null)

  const [markers, setMarkers] = useState()
  const [lastMarker, setLastMarker] = useState()
  const [nearestMarker, setNearestMarker] = useState<mapboxgl.Marker>()
  const [userLocation, setUserLocation] = useState()

  const getInstallationList = async () => {
    await fetchBenchList({ name: true, description: true, geolocation: true })
  }

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string

    map.current = new MapboxGlMap({
      container: 'map',
      zoom: 15,
      center: [2.40592, 48.8757],
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v2'
    });

    geolocate.current = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    geolocate.current.on('geolocate', function (e: any) {
      setUserLocation([e.coords.longitude, e.coords.latitude])
    })

    map.current.on('load', function () {
      getInstallationList()
      if (geolocate.current) {
        geolocate.current.trigger()
      }
    })

    map.current.addControl(geolocate.current);

    directions.current = MapManager.initMapboxDirections()
    //@ts-ignore
    map.current.addControl(directions.current);

    // //@ts-ignore
    // directions.current = new MapboxDirections({
    //   accessToken: mapboxgl.accessToken,
    //   unit: 'metric',
    //   profile: 'mapbox/walking',
    // });

    // //@ts-ignore
    // map.current.addControl(directions.current);
  }, [])

  useEffect(() => {
    if (map.current) {
      const markers = MapManager.setAllMarkers(benchList,map.current)
      setMarkers(markers)
    }
  }, [benchList])

  const loadInstalationList = () => {
    getInstallationList()
  }

  const test = () => {
    const nearestMarker = MapManager.getNearestMarker(markers, userLocation)

    const lngLat = nearestMarker.getLngLat()
    const lngLatArr = [lngLat.lng, lngLat.lat]

    //@ts-ignore
    directions.current.setOrigin(userLocation);
    //@ts-ignore
    directions.current.setDestination(lngLatArr)
  }

  return (
    <>
      <div id="map"></div>
      <button onClick={loadInstalationList}>Load instalations data</button>
      <button onClick={test}>Get nearest marker</button>
    </>
  )
}

export default observer(ProtoMap)