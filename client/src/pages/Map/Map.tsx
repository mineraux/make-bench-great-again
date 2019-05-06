import React, { FunctionComponent } from 'react'
import Transition from './Transition'
import ProtoMap from '../../components/map/ProtoMap'
import { pageProps } from '../types'

type props = pageProps & {}

const Map: FunctionComponent<props> = ({ show }) => {
  return (
    <Transition show={show}>
      <div className={'page-map'}>
        <ProtoMap />
      </div>
    </Transition>
  )
}

export default Map
