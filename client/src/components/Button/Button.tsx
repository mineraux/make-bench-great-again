import React, { FunctionComponent } from 'react'
import Classnames from 'classnames'
import { Link } from 'react-router-dom'
import './button.scss'
import { ReactComponent as TwitterIcon } from '../../assets/images/ico_twitter.svg'

export enum themes {
  Blue = 'blue',
  Green = 'green',
  Pink = 'pink',
}

type Props = {
  className?: string
  link?: string
  onClick?: () => any
  label: string
  theme: themes
  url?: string
  icon?: boolean
}

const Button: FunctionComponent<Props> = ({
  className,
  onClick,
  label,
  link,
  theme,
  url,
  icon,
}) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick()
    }
  }

  if (link) {
    return (
      <Link
        to={link}
        className={Classnames(className, 'button', `theme-${theme}`)}
        onClick={handleOnClick}
      >
        <span className={Classnames('button__label', `theme-${theme}`)}>
          {label}
        </span>
      </Link>
    )
  } else if (url) {
    return (
      <a
        target="_blank"
        href={url}
        className={Classnames(className, 'button', `theme-${theme}`)}
      >
        {icon && <TwitterIcon className="button__twitter-icon" />}
        <span className={Classnames('button__label', `theme-${theme}`)}>
          {label}
        </span>
      </a>
    )
  } else {
    return (
      <div
        className={Classnames(className, 'button', `theme-${theme}`)}
        onClick={handleOnClick}
      >
        <span className={Classnames('button__label', `theme-${theme}`)}>
          {label}
        </span>
      </div>
    )
  }
}

export default Button
