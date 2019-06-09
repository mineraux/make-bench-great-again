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
  isTextVisible?: boolean
}

const ScrollIndication: FunctionComponent<Props> = ({
  className,
  title = 'Scroll',
  theme = themes.Green,
  isVisible = true,
  isTextVisible = true,
}) => {
  return (
    <div
      className={ClassNames('scroll-indication', className, `theme-${theme}`, {
        visible: isVisible,
      })}
    >
      <p
        className={ClassNames('scroll-indication__title', {
          visible: isTextVisible,
        })}
      >
        {title}
      </p>
      <Arrow className={'scroll-indication__icon'} />
    </div>
  )
}

export default ScrollIndication
