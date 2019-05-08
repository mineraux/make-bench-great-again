import React, { FunctionComponent } from 'react'
import Classnames from 'classnames'
import './header.scss'
import Countdown, { themes as CountdownThemes } from '../Countdown/Countdown'
import BurgerButton, {
  themes as BurgerButtonThemes,
} from '../BurgerButton/BurgerButton'

export enum themes {
  Blue = 'blue',
  Green = 'green',
}

const theming = {
  burgerButton: {
    [themes.Blue]: BurgerButtonThemes.Green,
    [themes.Green]: BurgerButtonThemes.Blue,
  },
  countdown: {
    [themes.Blue]: CountdownThemes.Green,
    [themes.Green]: CountdownThemes.Blue,
  },
}

type Props = {
  className?: string
  title: string
  theme: themes
}

const Header: FunctionComponent<Props> = ({ className, title, theme }) => {
  return (
    <header className={Classnames(className, 'header', `theme-${theme}`)}>
      <Countdown theme={theming.countdown[theme]} />
      <p className={Classnames(className, 'header__title')}>{title}</p>
      <BurgerButton theme={theming.burgerButton[theme]} />
    </header>
  )
}

export default Header
