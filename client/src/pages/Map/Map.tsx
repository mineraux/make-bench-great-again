import React, { FunctionComponent } from 'react'
import Transition from './Transition'
import ProtoMap from '../../components/map/ProtoMap'
import { pageProps } from '../types'
import 'mapbox-gl/dist/mapbox-gl.css'

type props = pageProps

const Map: FunctionComponent<props> = () => {
  return (
    <div className={'page-map'}>
      <ProtoMap />
    </div>
  )
}

export default Map
