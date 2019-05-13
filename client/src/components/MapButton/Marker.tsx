import React, { FunctionComponent } from 'react'
import Classnames from 'classnames'
import { ReactComponent as MarkerIcon } from '../../assets/images/ico_marker.svg'
import './marker.scss'
import { themes } from '../Button/Button'

type Props = {
  className?: string
  parentTheme: themes
}

const Marker: FunctionComponent<Props> = ({ className, parentTheme }) => {
  const computeTheme = () => {
    let theme = themes.Blue

    if (parentTheme === themes.Blue) {
      theme = themes.Pink
    } else if (parentTheme === themes.Pink) {
      theme = themes.Blue
    }

    return theme
  }

  return (
    <MarkerIcon
      className={Classnames(
        'map-button__marker',
        className,
        `theme-${computeTheme()}`
      )}
    />
  )
}

export default Marker
