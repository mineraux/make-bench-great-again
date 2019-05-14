import React, { FunctionComponent, useEffect, useRef } from 'react'
import Classnames from 'classnames'
import { Link } from 'react-router-dom'
import config from '../../config/config'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import { ReactComponent as MarkerIcon } from './marker.svg'
import './mapButton.scss'
import { TimelineMax } from 'gsap'

export enum themes {
  Blue = 'blue',
  Pink = 'pink',
}

type Props = {
  className?: string
}

const MapButton: FunctionComponent<Props> = ({ className }) => {
  const {
    isMapButtonVisible,
    mapButtonTheme,
    setIsMapButtonVisible,
  } = NavigationStore

  const ref = useRef<HTMLLinkElement>(null)

  useEffect(() => {
    const tl = new TimelineMax()
    if (ref.current) {
      tl.to(ref.current, 0.3, {
        xPercent: isMapButtonVisible ? -50 : -100,
        yPercent: isMapButtonVisible ? 50 : 100,
        opacity: isMapButtonVisible ? 1 : 0,
        ease: 'Sine.easeInOut',
      })
    }
  }, [isMapButtonVisible])

  const handleOnClick = () => {
    setIsMapButtonVisible(false)
  }

  return (
    <Link
      // @ts-ignore
      innerRef={ref}
      to={config.routes.Map.path}
      className={Classnames(
        'map-button',
        className,
        `theme-${mapButtonTheme}`,
        { visible: isMapButtonVisible }
      )}
      onClick={handleOnClick}
    >
      <MarkerIcon className={Classnames('map-button__icon')} />
    </Link>
  )
}

export default observer(MapButton)
