import React, { FunctionComponent, useEffect } from 'react'
import Transition from './Transition'
import ProtoMap from '../../components/map/ProtoMap'
import { pageProps } from '../types'
import 'mapbox-gl/dist/mapbox-gl.css'
import { NavigationStore } from '../../store'
import { useWindowSize } from '../../utils/hooks'

type props = pageProps

const Map: FunctionComponent<props> = ({ match, history }) => {
  const { setIsMapButtonVisible } = NavigationStore
  const windowHeight = useWindowSize().height

  useEffect(() => {
    console.log('map mounted')
    setIsMapButtonVisible(false)
  }, [])
  return (
    <div
      className={'page-map'}
      style={{
        height: windowHeight,
      }}
    >
      <ProtoMap match={match} history={history} />
    </div>
  )
}

export default Map
