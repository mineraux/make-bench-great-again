import React, { FunctionComponent, useEffect, useCallback, useRef } from "react";
import './map.scss'
import { observer } from "mobx-react-lite";
import Store from "../../store/Store";
var mapboxgl = require('mapbox-gl/dist/mapbox-gl')
var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

const ProtoMap: FunctionComponent = () => {

  const {benchList, fetchBenchList} = Store

  let map = useRef(null);
  let directions = useRef(null);
  let geolocate = useRef(null)

  const getInstallationList = async() => {
    await fetchBenchList({name:true, description: true, geolocation: true})
  }
  
  mapboxgl.accessToken = 'pk.eyJ1IjoibWluZXJhdXgiLCJhIjoiY2p1YTV1ZGZ2MDFhMjRicW52aTEwcm12dSJ9.B1KT6acYBd9EsQIQXOBRcQ';

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: 'map',
      zoom: 15,
      center: [2.40592, 48.8757],
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v2'
    });

    geolocate.current = new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    //@ts-ignore
    geolocate.current.on('geolocate', function(e:any) {
      //@ts-ignore
      directions.setOrigin([e.coords.longitude, e.coords.latitude]);
      //@ts-ignore
      directions.setDestination([2.402, 48.8787])
    })
    
    //@ts-ignore
    map.current.on('load', function() {
      getInstallationList()
      //@ts-ignore
      geolocate.current.trigger()
    })

    //@ts-ignore
    map.current.addControl(geolocate.current);

  directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/cycling'
  });
  //@ts-ignore
  map.current.addControl(directions);
  }, [])

  useEffect(() => {
    benchList.map(bench => {
      const marker = new mapboxgl.Marker().setLngLat(bench.geolocation).addTo(map.current)
      console.log(bench.geolocation)
    })
  },[benchList])

  const yolo = () => {
    getInstallationList()
  }

  return (
    <>
      <div id="map"></div>
      <button onClick={yolo}>YOLO</button>
    </>
  )
}

export default observer(ProtoMap)