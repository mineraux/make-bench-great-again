import React, { FunctionComponent } from 'react'
import Classnames from 'classnames'
import { Link } from 'react-router-dom'
import './button.scss'

export enum themes {
  Blue = 'blue',
  Green = 'green',
  Pink = 'pink',
}

type Props = {
  className?: string
  link?: string
  onClick: () => any
  label: string
  theme: themes
}

const Button: FunctionComponent<Props> = ({
  className,
  onClick,
  label,
  link,
  theme,
}) => {
  if (link) {
    return (
      <Link
        to={link}
        className={Classnames(className, 'button', `theme-${theme}`)}
        onClick={onClick}
      >
        <span className={Classnames('button__label', `theme-${theme}`)}>
          {label}
        </span>
      </Link>
    )
  } else {
    return (
      <div
        className={Classnames(className, 'button', `theme-${theme}`)}
        onClick={onClick}
      >
        <span className={Classnames('button__label', `theme-${theme}`)}>
          {label}
        </span>
      </div>
    )
  }
}

export default Button
