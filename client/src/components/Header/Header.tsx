import React, { FunctionComponent, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import Classnames from 'classnames'
import Countdown, { themes as CountdownThemes } from '../Countdown/Countdown'
import BurgerButton, {
  themes as BurgerButtonThemes,
} from '../BurgerButton/BurgerButton'
import ProgressBar from '../ProgressBar/ProgressBar'
import { TimelineMax, Power1 } from 'gsap'
import './header.scss'

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
  const { scrollProgression, isHeaderVisible } = NavigationStore

  const ref = useRef<HTMLHeadElement>(null)
  useEffect(() => {
    if (ref.current && isHeaderVisible) {
      const tl = new TimelineMax()

      tl.to(ref.current, 1, {
        transform: 'translateY(0)',
        ease: Power1.easeInOut,
      })
    }
  }, [isHeaderVisible])

  return (
    <header
      ref={ref}
      className={Classnames(className, 'header', `theme-${theme}`, {
        visible: isHeaderVisible,
      })}
    >
      <Countdown theme={theming.countdown[theme]} />
      <p className={Classnames(className, 'header__title')}>{title}</p>
      <BurgerButton theme={theming.burgerButton[theme]} />
      <ProgressBar
        progression={scrollProgression}
        className={'header__progress-bar'}
      />
    </header>
  )
}

export default observer(Header)
