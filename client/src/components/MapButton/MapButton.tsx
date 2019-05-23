import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import Classnames from 'classnames'
import { Link } from 'react-router-dom'
import config from '../../config/config'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import { ReactComponent as MarkerIcon } from './marker.svg'
import './mapButton.scss'
import { TimelineMax, Sine } from 'gsap'

export enum themes {
  Blue = 'blue',
  Pink = 'pink',
}
export const sizeInMenu = 500

type Props = {
  className?: string
}

const MapButton: FunctionComponent<Props> = ({ className }) => {
  const {
    isMapButtonVisible,
    mapButtonTheme,
    setIsMapButtonVisible,
    currentPagePath,
  } = NavigationStore

  const ref = useRef<HTMLLinkElement>(null)

  // Hide / show animation
  useEffect(() => {
    const tl = new TimelineMax()
    if (ref.current) {
      tl.to(ref.current, 0.3, {
        xPercent: isMapButtonVisible ? -50 : -100,
        yPercent: isMapButtonVisible ? 50 : 100,
        opacity: isMapButtonVisible ? 1 : 0,
        ease: Sine.easeInOut,
      })
    }
  }, [isMapButtonVisible])

  // Menu animation
  useEffect(() => {
    const tl = new TimelineMax()
    if (ref.current) {
      if (currentPagePath === config.routes.Menu.path) {
        const currentSize = ref.current.clientWidth
        tl.to(ref.current, 1, {
          scale: sizeInMenu / currentSize,
          ease: Sine.easeInOut,
        })
      } else {
        tl.to(ref.current, 0.5, {
          scale: 1,
          ease: Sine.easeInOut,
        })
      }
    }
  }, [currentPagePath])

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
