import React, { FunctionComponent, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Feature } from 'geojson'
import { Link } from 'react-router-dom'
import ClassNames from 'classnames'
import './informationsPanel.scss'
import Button, { themes as ButtonThemes } from '../../components/Button/Button'
import { ReactComponent as CrossIco } from '../../assets/images/close_ico.svg'

interface Props {
  marker: Feature
  travelTime: Number
  travelDistance: Number
  className?: string
  onButtonClick: any
  isTourStarted: boolean
}

const InformationsPanel: FunctionComponent<Props> = ({
  marker,
  travelTime,
  travelDistance,
  className,
  onButtonClick,
  isTourStarted,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [benchTargetName, setBenchTargetName] = useState(
    'Choisissez une oeuvre'
  )
  const [benchTargetDescription, setBenchTargetDescription] = useState()

  useEffect(() => {
    if (marker && marker.properties) {
      setBenchTargetName(marker.properties.name)
      setBenchTargetDescription(marker.properties.description)
      setIsOpen(true)
    }
  }, [marker])

  return (
    <div
      className={ClassNames('informations-panel', className, {
        open: isOpen,
      })}
    >
      {benchTargetDescription && (
        <button
          className="informations-panel__close-ico"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <CrossIco />
        </button>
      )}
      <div className="informations-panel__informations--installation">
        <span className="informations-panel__informations--installation__bench-name">
          {benchTargetName}
        </span>
        <span className="informations-panel__informations--installation__bench-description">
          {benchTargetDescription}
        </span>
        {marker && marker.properties && (
          <Link
            to={`/bench/${marker.properties._id}`}
            className={
              'informations-panel__informations--installation__bench-see-more'
            }
          >
            en savoir plus
          </Link>
        )}
      </div>
      {!isTourStarted && (
        <Button
          onClick={onButtonClick}
          label={'Calculer mon itinéraire'}
          theme={ButtonThemes.Blue}
          className={'informations-panel__set-direction-button'}
        />
      )}
      <div className="informations-panel__travel-duration">
        {travelTime && travelDistance && (
          <p>
            Nous vous prévoyons {travelTime} minutes de trajet ({travelDistance}{' '}
            km)
          </p>
        )}
      </div>
    </div>
  )
}

export default observer(InformationsPanel)
