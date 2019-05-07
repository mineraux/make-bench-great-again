import React, { FunctionComponent, useEffect, useState } from 'react'
import Classnames from 'classnames'
import './burger-button.scss'
import { observer } from 'mobx-react-lite'
import PageStore from '../../store/PageStore'

export enum themes {
  Blue = 'blue',
  Green = 'green',
  Pink = 'pink',
}

type Props = {
  className?: string
  theme: themes
}

const BurgerButton: FunctionComponent<Props> = ({ className, theme }) => {
  const [isOpen, setIsOpen] = useState(PageStore.isMenuOpen)

  const handleOnClick = () => {
    PageStore.setIsMenuOpen(!isOpen)
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={Classnames(className, 'burger-button', `theme-${theme}`, {
        open: isOpen,
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
