import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import Classnames from 'classnames'
import { Link } from 'react-router-dom'
import config from '../../config/config'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import { ReactComponent as MarkerIcon } from './marker.svg'
import './mapButton.scss'
import { TimelineMax, Power1, Power2 } from 'gsap'

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
  const [isMenuTransition, setIsMenuTransition] = useState(false)

  const {
    isMapButtonVisible,
    setIsMapButtonVisible,
    isMapButtonMenu,
    setIsMapButtonMenu,
    mapButtonTheme,
    setMapButttonThemes,
    currentPagePath,
    nextPagePath,
  } = NavigationStore

  useEffect(() => {
    const routesArrray = Object.keys(config.routes).map(
      key => config.routes[key]
    )

    const currentRoute = routesArrray.find(
      route => route.path === currentPagePath
    )
    const isMapButtonOnCurrentPage = currentRoute!.isMapButtonVisible

    if (isMapButtonOnCurrentPage) {
      setIsMapButtonVisible(true)
    } else {
      setIsMapButtonVisible(false)
    }
  }, [currentPagePath])

  useEffect(() => {
    if (nextPagePath === config.routes.Menu.path) {
      setIsMapButtonMenu(true)
    }
  }, [nextPagePath])

  // Hide / show animation
  useEffect(() => {
    if (
      ref.current &&
      currentPagePath !== config.routes.Menu.path &&
      !isMenuTransition
    ) {
      const icon = ref.current.querySelector('.map-button__icon')
      const tl = new TimelineMax()
      if (isMapButtonVisible) {
        console.log('MapButton : visible')
        const scale = sizeNormal / sizeInMenu
        tl.fromTo(
          ref.current,
          0.8,
          {
            scale: 0,
          },
          {
            scale,
            opacity: 1,
            ease: Power1.easeInOut,
            overwrite: true,
          }
        ).to(icon!, 0.6, {
          opacity: 1,
          filter: 'blur(0)',
          autoRound: false,
          ease: Power1.easeInOut,
          overwrite: true,
        })
      } else {
        tl.to(icon!, 0.4, {
          opacity: 0,
          filter: 'blur(4px)',
          autoRound: false,
          ease: Power1.easeInOut,
          // overwrite: false,
        }).to(
          ref.current,
          0.8,
          {
            scale: 0,
            ease: Power1.easeInOut,
            // overwrite: false,
          },
          '-=0.1'
        )
      }
    }
  }, [isMapButtonVisible])

  // Menu animation
  useEffect(() => {
    if (ref.current) {
      if (isMapButtonMenu) {
        animationMenuIn()
      } else if (currentPagePath === config.routes.Menu.path) {
        animationMenuOut()
      }
    }
  }, [isMapButtonMenu])

  const animationMenuIn = () => {
    if (ref.current) {
      console.log('MapButton : animationMenuIn')
      const tl = new TimelineMax({})
      const icon = ref.current.querySelector('.map-button__icon')
      const text = ref.current.querySelector('.map-button__menu-text')

      tl.add(() => {
        setMapButttonThemes(themes.Pink)
      })
        .to(
          icon!,
          0.8,
          {
            opacity: 0,
            filter: 'blur(4px)',
            autoRound: false,
            ease: Power1.easeInOut,
            overwrite: true,
          },
          0
        )
        .add('iconEnd', '-=0')
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
        .to(
          ref.current,
          1.4,
          {
            filter:
              currentPagePath === config.routes.Menu.path
                ? 'blur(0)'
                : 'blur(20px)',
            autoRound: false,
            ease: Power1.easeInOut,
            overwrite: false,
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
      console.log('MapButton: animationMenuOut')
      const tl = new TimelineMax({
        onStart: () => {
          setIsMenuTransition(true)
        },
        onComplete: () => {
          setIsMenuTransition(false)
        },
      })
      const icon = ref.current.querySelector('.map-button__icon')
      const text = ref.current.querySelector('.map-button__menu-text')

      const scale = sizeNormal / sizeInMenu

      const routesArrray = Object.keys(config.routes).map(
        key => config.routes[key]
      )
      const nextRoute = routesArrray.find(route => route.path === nextPagePath)
      const isMapButtonOnNextPage = nextRoute!.isMapButtonVisible

      tl.to(text!, 0.4, {
        opacity: 0,
        filter: 'blur(4px)',
        autoRound: false,
        ease: Power1.easeInOut,
      })
        .add('textEnd')
        .to(
          [ref.current, text],
          1.2,
          {
            scale: isMapButtonOnNextPage ? scale : 0,
            filter: 'blur(0)',
            autoRound: false,
            ease: Power1.easeInOut,
          },
          'textEnd-=0.1'
        )
        .to(icon!, 0.8, {
          opacity: isMapButtonOnNextPage ? 1 : 0,
          filter: 'blur(0)',
          autoRound: false,
          ease: Power1.easeInOut,
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
