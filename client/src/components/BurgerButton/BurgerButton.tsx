import React, { FunctionComponent, useEffect, useState } from 'react'
import Classnames from 'classnames'
import './burger-button.scss'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import config from '../../config/config'

export enum themes {
  Blue = 'blue',
  Green = 'green',
  Pink = 'pink',
}

interface Props {
  className?: string
  theme: themes
  history?: any
  // onClick?: (isOpen: boolean) => any
}

const BurgerButton: FunctionComponent<Props> = ({
  className,
  theme,
  history,
}) => {
  // const [isOpen, setIsOpen] = useState(NavigationStore.isMenuOpen)

  const {
    isMenuOpen,
    setIsMenuOpen,
    currentPagePath,
    nextPagePath,
  } = NavigationStore

  const handleOnClick = () => {
    if (history) {
      if (!isMenuOpen) {
        console.log('go to menu')
        history.push(config.routes.Menu.path)
      } else {
        console.log('go back')
        history.goBack()
      }
    }
  }

  useEffect(() => {
    if (
      currentPagePath === config.routes.Menu.path &&
      nextPagePath !== config.routes.Menu.path
    ) {
      setIsMenuOpen(false)
    } else if (
      currentPagePath === config.routes.Menu.path ||
      nextPagePath === config.routes.Menu.path
    ) {
      setIsMenuOpen(true)
    }
  }, [currentPagePath, nextPagePath])

  return (
    <div
      className={Classnames(className, 'burger-button', `theme-${theme}`, {
        open: isMenuOpen,
      })}
      onClick={handleOnClick}
    >
      <span />
      <span />
      <span />
    </div>
  )
}

export default observer(BurgerButton)
