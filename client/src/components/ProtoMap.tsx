import React, { FunctionComponent, useEffect } from "react";
import './map.scss'
var mapboxgl = require('mapbox-gl/dist/mapbox-gl')

const ProtoMap: FunctionComponent = () => {

  mapboxgl.accessToken = 'pk.eyJ1IjoibWluZXJhdXgiLCJhIjoiY2p1YTV1ZGZ2MDFhMjRicW52aTEwcm12dSJ9.B1KT6acYBd9EsQIQXOBRcQ';

  useEffect(() => {
    console.log('test')
    var map = new mapboxgl.Map({
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
  }, [])

  return (
    <>
      <div id="map"></div>
    </>
  )
}

export default ProtoMap