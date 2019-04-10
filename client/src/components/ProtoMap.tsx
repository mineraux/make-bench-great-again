import React, { FunctionComponent, useEffect } from "react";
import './map.scss'
var mapboxgl = require('mapbox-gl/dist/mapbox-gl')
var MapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');

const ProtoMap: FunctionComponent = () => {

  mapboxgl.accessToken = 'pk.eyJ1IjoibWluZXJhdXgiLCJhIjoiY2p1YTV1ZGZ2MDFhMjRicW52aTEwcm12dSJ9.B1KT6acYBd9EsQIQXOBRcQ';

  //@ts-ignore
  let directions;
  //@ts-ignore
  let geolocate;

  let userLocation;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      zoom: 15,
      center: [2.40592, 48.8757],
      style: 'mapbox://styles/mapbox/navigation-guidance-night-v2'
    });

    const marker = new mapboxgl.Marker()
    .setLngLat([2.40590, 48.8757])
    .addTo(map);

    const marker2 = new mapboxgl.Marker()
    .setLngLat([2.402, 48.8787])
    .addTo(map);

    geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    geolocate.on('geolocate', function() {
      //@ts-ignore
      console.log('User geolocated !')
    })

    map.addControl(geolocate);

  directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/cycling'
  });
  map.addControl(directions);
  
  
  }, [])

  const yolo = () => {
    //@ts-ignore
    directions.setOrigin([2.402, 48.8787])
    //@ts-ignore
    directions.setDestination([2.40590, 48.8757])
  }

  return (
    <>
      <div id="map"></div>
      <button onClick={yolo}>YOLO</button>
    </>
  )
}

export default ProtoMap