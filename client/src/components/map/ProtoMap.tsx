import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import './map.scss'
import { observer } from "mobx-react-lite";
import Store from "../../store/Store";
import mapboxgl, { GeolocateControl, Map as MapboxGlMap } from 'mapbox-gl'
import MapManager from "./MapManager";
import { Coords } from '../../@types'

const ProtoMap: FunctionComponent = () => {

  const { benchList, fetchBenchList } = Store

  let map = useRef<MapboxGlMap | null>(null);
  let directions = useRef(MapManager.initMapboxDirections());
  let geolocate = useRef<GeolocateControl>(MapManager.initGeolocate())

  const [markers, setMarkers] = useState()
  const [userLocation, setUserLocation] = useState()

  const getInstallationList = async () => {
    await fetchBenchList({ name: true, description: true, geolocation: true })
  }

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string

    map.current = MapManager.initMapCanvas('map', 15, [2.40592, 48.8757], 'mapbox://styles/mapbox/navigation-guidance-night-v2')
    map.current.addControl(geolocate.current)
    //@ts-ignore
    map.current.addControl(directions.current);

    map.current.on('load', function () {
      getInstallationList()
      geolocate.current.trigger()
    })

    geolocate.current.on('geolocate', function (e: any) {
      setUserLocation([e.coords.longitude, e.coords.latitude])
    })
  }, [])

  useEffect(() => {
    if (map.current) {
      const markers = MapManager.setAllMarkers(benchList, map.current)
      setMarkers(markers)
    }
  }, [benchList])

  const setFastestPath = () => {
    const nearestMarker = MapManager.getNearestMarker(markers, userLocation)
    const nearestMarkerCoords = nearestMarker.getLngLat()
    const normalizedNearestMarkerCoords:Coords = [nearestMarkerCoords.lng, nearestMarkerCoords.lat]

    //@ts-ignore
    directions.current.setOrigin(userLocation);
    //@ts-ignore
    directions.current.setDestination(normalizedNearestMarkerCoords)
  }

  return (
    <>
      <div id="map"></div>
      {markers && userLocation && <button onClick={setFastestPath}>Get nearest marker</button>}
    </>
  )
}

export default observer(ProtoMap)