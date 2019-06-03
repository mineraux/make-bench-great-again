import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import Classnames from 'classnames'
import { Link } from 'react-router-dom'
import config from '../../config/config'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import { ReactComponent as MarkerIcon } from './marker.svg'
import './mapButton.scss'
import { TimelineMax, Sine, Power1, Power2 } from 'gsap'

export enum themes {
  Blue = 'blue',
  Pink = 'pink',
}

export const sizeInMenu = 500
export const sizeNormal = 130

type Props = {
  className?: string
}

const MapButton: FunctionComponent<Props> = ({ className }) => {
  const ref = useRef<HTMLLinkElement>(null)

  const {
    isMapButtonVisible,
    setIsMapButtonVisible,
    isMapButtonMenu,
    setIsMapButtonMenu,
    mapButtonTheme,
    currentPagePath,
    nextPagePath,
  } = NavigationStore

  // Hide / show animation
  useEffect(() => {
    const tl = new TimelineMax()
    console.log('show', isMapButtonVisible, currentPagePath)
    if (ref.current) {
      tl.to(ref.current, 0.7, {
        xPercent: isMapButtonVisible ? -50 : -100,
        yPercent: isMapButtonVisible ? 50 : 100,
        opacity: isMapButtonVisible ? 1 : 0,
        ease: Power2.easeInOut,
      })
    }
  }, [isMapButtonVisible])

  useEffect(() => {
    if (nextPagePath === config.routes.Menu.path) {
      console.log('next page is menu')
      setIsMapButtonMenu(true)
    }
  }, [nextPagePath])

  // Menu animation
  useEffect(() => {
    if (ref.current) {
      if (isMapButtonMenu) {
        animationMenuIn()
      } else {
        animationMenuOut()
      }
    }
  }, [isMapButtonMenu])

  const animationMenuIn = () => {
    if (ref.current) {
      console.log('MapButton : animationMenuIn')
      const tl = new TimelineMax()
      const icon = ref.current.querySelector('.map-button__icon')
      const text = ref.current.querySelector('.map-button__menu-text')

      tl.to(
        icon!,
        0.5,
        {
          opacity: 0,
          filter: 'blur(4px)',
          autoRound: false,
          ease: Power1.easeInOut,
          overwrite: true,
        },
        0
      )
        .add('iconEnd', '-=0.1')
        .to(
          ref.current,
          1.4,
          {
            xPercent: -50,
            yPercent: 50,
            ease: Power1.easeInOut,
          },
          'iconEnd'
        )
        .to(
          ref.current,
          1.4,
          {
            opacity: 1,
            scale: 1,
            ease: Power1.easeInOut,
          },
          'iconEnd'
        )
        // .add('scale', 'iconEnd')
        .to(
          ref.current,
          1.4,
          {
            filter: 'blur(20px)',
            autoRound: false,
            ease: Power1.easeInOut,
          },
          'iconEnd'
        )
        .to(
          text!,
          1.4,
          {
            scale: 1,
            ease: Power1.easeInOut,
          },
          'iconEnd'
        )
    }
  }

  const animationMenuOut = () => {
    if (ref.current) {
      console.log('MapButton: animationMenuOut', nextPagePath)
      const tl = new TimelineMax()
      const icon = ref.current.querySelector('.map-button__icon')
      const text = ref.current.querySelector('.map-button__menu-text')

      const scale = sizeNormal / sizeInMenu

      const routesArrray = Object.keys(config.routes).map(
        key => config.routes[key]
      )
      const nextRoute = routesArrray.find(route => route.path === nextPagePath)
      const isMapButtonOnNextPage = nextRoute!.isMapButtonVisible

      console.log('MapButton : isMapButtonOnNextPage', isMapButtonOnNextPage)

      tl.to(text!, 0.4, {
        opacity: 0,
        filter: 'blur(4px)',
        autoRound: false,
        ease: Power2.easeInOut,
      })
        .add('textEnd')
        .to(
          ref.current,
          0.8,
          {
            xPercent: isMapButtonOnNextPage ? -50 : -100,
            yPercent: isMapButtonOnNextPage ? 50 : 100,
            opacity: isMapButtonOnNextPage ? 1 : 0,
            ease: Power2.easeInOut,
          },
          'textEnd'
        )
        .to(
          [ref.current, text],
          0.8,
          {
            scale,
            filter: 'blur(0)',
            autoRound: false,
            ease: Power2.easeInOut,
          },
          'textEnd'
        )
        .to(icon!, 0.8, {
          opacity: 1,
          filter: 'blur(0)',
          ease: Power2.easeInOut,
        })
    }
  }

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
      style={{
        width: `${sizeInMenu / 10}rem`,
        height: `${sizeInMenu / 10}rem`,
      }}
    >
      <MarkerIcon
        className={Classnames('map-button__icon')}
        style={{
          height: `${(sizeInMenu / sizeNormal) * 2.6}rem`,
        }}
      />
      <p className="map-button__menu-text">
        <span>M</span>
        <span>A</span>
        <span>P</span>
      </p>
    </Link>
  )
}

export default observer(MapButton)
