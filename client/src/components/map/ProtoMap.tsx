import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import './map.scss'
import { observer } from "mobx-react-lite";
import Store from "../../store/Store";
import mapboxgl, { GeolocateControl, Map as MapboxGlMap, Marker } from 'mapbox-gl'
// import MapBoxDirections from '@mapbox/mapbox-gl-directions'
var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
import * as turf from '@turf/turf'
import { number } from "prop-types";

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

    //@ts-ignore
    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/walking',
    });

    //@ts-ignore
    map.current.addControl(directions.current);
  }, [])

  useEffect(() => {
    const tempMarkers: mapboxgl.Marker[] = []
    if (map.current) {
      benchList.map(bench => {
        let marker = new mapboxgl.Marker().setLngLat(bench.geolocation).addTo(map.current!)
        tempMarkers.push(marker)
      })

      setMarkers(tempMarkers)
    }
  }, [benchList])

  const loadInstalationList = () => {
    getInstallationList()
  }

  const getNearestMarker = () => {
    let lastDistance = 99999

    markers.map((marker: mapboxgl.Marker, index: number) => {
      const lngLat = marker.getLngLat()
      const lngLatArr = [lngLat.lng, lngLat.lat]

      const distance = turf.distance(userLocation, lngLatArr)
      if (distance < lastDistance) {
        setNearestMarker(marker)
      }

      lastDistance = distance
    })

    if (nearestMarker && userLocation) {
      const lngLat = nearestMarker.getLngLat()
      const lngLatArr = [lngLat.lng, lngLat.lat]
      console.log(userLocation)

      //@ts-ignore
      directions.current.setOrigin(userLocation);
      //@ts-ignore
      directions.current.setDestination(lngLatArr)
    }
  }

  return (
    <>
      <div id="map"></div>
      <button onClick={loadInstalationList}>Load instalations data</button>
      <button onClick={getNearestMarker}>Get nearest marker</button>
    </>
  )
}

export default observer(ProtoMap)