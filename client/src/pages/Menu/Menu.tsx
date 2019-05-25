import React, { Fragment, FunctionComponent, useState, useEffect } from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
import { useWindowSize } from '../../utils/hooks'
import { sizeInMenu as MapButtonSizeInMenu } from '../../components/MapButton/MapButton'

import './menu.scss'

import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'

type Props = pageProps

const Menu: FunctionComponent<Props> = () => {
  const {} = NavigationStore

  const windowSize = useWindowSize()

  const { setIsMapButtonVisible } = NavigationStore

  useEffect(() => {
    // setIsMapButtonVisible(true)
  }, [])

  useEffect(() => {
    // setIsMapButtonVisible(true)
    console.log('cc', windowSize)
  })

  return (
    <div className={'page-menu'} style={{ height: windowSize.height }}>
      <div className="page-menu__top">
        <div className="page-menu__top__round">
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
