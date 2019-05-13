import React, { FunctionComponent } from 'react'
import Classnames from 'classnames'
import Marker from './Marker'
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
      <Marker parentTheme={theme} />
    </Link>
  )
}

export default MapButton
