import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import Classnames from 'classnames'
import { Link } from 'react-router-dom'
import config from '../../config/config'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import { ReactComponent as MarkerIcon } from './marker.svg'
import './mapButton.scss'
import { TimelineMax, Sine, Power2 } from 'gsap'

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
    isMapButtonMenu,
    mapButtonTheme,
    setIsMapButtonVisible,
    currentPagePath,
  } = NavigationStore

  const ref = useRef<HTMLLinkElement>(null)

  // Hide / show animation
  useEffect(() => {
    const tl = new TimelineMax()
    // console.log(currentPagePath, isMapButtonVisible);
    if (ref.current) {
      console.log('show', isMapButtonMenu, isMapButtonVisible)
      tl.to(ref.current, 0.7, {
        xPercent: isMapButtonVisible ? -50 : -100,
        yPercent: isMapButtonVisible ? 50 : 100,
        opacity: isMapButtonVisible ? 1 : 0,
        ease: Power2.easeInOut,
      })
    }
  }, [isMapButtonVisible])

  // Menu animation
  useEffect(() => {
    const tl = new TimelineMax()
    if (ref.current) {
      const icon = ref.current.querySelector('.map-button__icon')
      const text = ref.current.querySelector('.map-button__menu-text')
      if (isMapButtonMenu) {
        // IN
        console.log('map in')
        const currentSize = ref.current.clientWidth
        const scale = sizeInMenu / currentSize
        tl.to(
          icon!,
          0.4,
          {
            opacity: 0,
            ease: Power2.easeInOut,
          },
          0
        )
          .add('iconEnd')
          .to(
            ref.current,
            0.7,
            {
              xPercent: -50,
              yPercent: 50,
            },
            'iconEnd'
          )
          .to(
            ref.current,
            1,
            {
              opacity: 1,
            },
            'iconEnd'
          )
          .add('scale', 'iconEnd')
          .to(
            ref.current,
            0.7,
            {
              scale,
              ease: Power2.easeInOut,
            },
            'scale'
          )
          .to(
            text!,
            0.7,
            {
              scale: 1 / scale,
              ease: Power2.easeInOut,
            },
            'scale'
          )
      } else {
        console.log('map out')
        // OUT
        tl.to(text!, 0.4, {
          opacity: 0,
          ease: Power2.easeInOut,
        })
          .to([ref.current, text], 0.7, {
            scale: 1,
            ease: Power2.easeInOut,
          })
          .to(icon!, 0.7, {
            opacity: 1,
            ease: Power2.easeInOut,
          })
      }
    }
  }, [isMapButtonMenu])

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
      <p className="map-button__menu-text">
        <span>M</span>
        <span>E</span>
        <span>N</span>
        <span>U</span>
      </p>
    </Link>
  )
}

export default observer(MapButton)
