import React, { FunctionComponent, useState, useEffect } from 'react'
import ClassNames from 'classnames'
import './scroll-indication.scss'
import { ReactComponent as Arrow } from './arrow.svg'

export enum themes {
  Blue = 'blue',
  Green = 'green',
}

type Props = {
  className?: string
  title?: string
  theme?: themes
  isVisible?: boolean
}

const ScrollIndication: FunctionComponent<Props> = ({
  className,
  title = 'Scroll',
  theme = themes.Green,
  isVisible = true,
}) => {
  return (
    <div
      className={ClassNames('scroll-indication', className, `theme-${theme}`, {
        visible: isVisible,
      })}
    >
      <p className={'scroll-indication__title'}>{title}</p>
      <Arrow className={'scroll-indication__icon'} />
    </div>
  )
}

export default ScrollIndication
