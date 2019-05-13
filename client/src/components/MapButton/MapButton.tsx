import React, { FunctionComponent } from 'react'
import Classnames from 'classnames'
import { ReactComponent as MarkerIcon } from '../../assets/images/ico_marker.svg'
import './mapButton.scss'
import { themes } from '../Button/Button'
import { Link } from 'react-router-dom'

type Props = {
  className?: string
  theme: themes
  link: string
}

const MapButton: FunctionComponent<Props> = ({ className, theme, link }) => {
  return (
    <Link
      to={link}
      className={Classnames('map-button', className, `theme-${theme}`)}
    >
      <MarkerIcon />
    </Link>
  )
}

export default MapButton
