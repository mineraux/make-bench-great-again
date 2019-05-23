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

  const windowHeight = useWindowSize().height

  const { setIsMapButtonVisible } = NavigationStore

  useEffect(() => {
    setIsMapButtonVisible(true)
  }, [])

  return (
    <div className={'page-menu'} style={{ height: windowHeight }}>
      <div className="page-menu__top">
        <div className="page-menu__top__round">
          <p className="page-menu__top__round__text">Programmation</p>
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
