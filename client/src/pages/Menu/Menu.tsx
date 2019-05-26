import React, {
  Fragment,
  FunctionComponent,
  useState,
  useEffect,
  useRef,
} from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
import { useWindowSize } from '../../utils/hooks'
import { sizeInMenu as MapButtonSizeInMenu } from '../../components/MapButton/MapButton'

import './menu.scss'

import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'

type Props = pageProps

const Menu: FunctionComponent<Props> = () => {
  const refTop = useRef<HTMLDivElement>(null)
  const refTopRound = useRef<HTMLDivElement>(null)

  const windowSize = useWindowSize()

  const { setIsMapButtonVisible } = NavigationStore

  useEffect(() => {
    if (refTop.current && refTopRound.current) {
      // max size = 90% parent height
      refTopRound.current.style.maxWidth = `${refTop.current.clientHeight *
        0.9}px`
      refTopRound.current.style.maxHeight = `${refTop.current.clientHeight *
        0.9}px`
    }
  }, [])

  return (
    <div className={'page-menu'} style={{ height: windowSize.height }}>
      <div className="page-menu__top" ref={refTop}>
        <div className="page-menu__top__round" ref={refTopRound}>
          <p className="page-menu__top__round__text">
            <span>P</span>
            <span>R</span>
            <span>O</span>
            <span>G</span>
            <span>R</span>
            <span>A</span>
            <span>M</span>
            <span>M</span>
            <span>A</span>
            <span>T</span>
            <span>I</span>
            <span>O</span>
            <span>N</span>
          </p>
        </div>
      </div>
      <div
        className="page-menu__bottom"
        style={{
          flex: `0 0 ${MapButtonSizeInMenu / 10 / 2}rem`,
        }}
      >
        <p className="page-menu__bottom__text">
          <span>A</span>
          <span>B</span>
          <span>O</span>
          <span>U</span>
          <span>T</span>
        </p>
      </div>
    </div>
  )
}

export default observer(Menu)
