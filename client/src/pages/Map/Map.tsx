import React, { FunctionComponent, useEffect } from 'react'
import Transition from './Transition'
import ProtoMap from '../../components/map/ProtoMap'
import { pageProps } from '../types'
import 'mapbox-gl/dist/mapbox-gl.css'
import { NavigationStore } from '../../store'

type props = pageProps

const Map: FunctionComponent<props> = () => {
  const { setIsMapButtonVisible } = NavigationStore
  useEffect(() => {
    setIsMapButtonVisible(false)
  }, [])
  return (
    <div className={'page-map'}>
      <ProtoMap />
    </div>
  )
}

export default Map
