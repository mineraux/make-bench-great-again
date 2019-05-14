import React, { FunctionComponent, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Feature } from 'geojson'
import ClassNames from 'classnames'
import './informationsPanel.scss'
import Button, {
  themes as ButtonThemes,
  themes,
} from '../../components/Button/Button'
import { ReactComponent as CrossIco } from '../../assets/images/close_ico.svg'
import { ReactComponent as WalkIco } from '../../assets/images/ico_walk.svg'

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
  const [installationTargetName, setInstallationTargetName] = useState(
    'Choisissez une oeuvre'
  )
  const [
    installationTargetDescription,
    setInstallationTargetDescription,
  ] = useState()

  useEffect(() => {
    if (marker && marker.properties) {
      setInstallationTargetName(marker.properties.name)
      setInstallationTargetDescription(marker.properties.description)
      setIsOpen(true)
    }
  }, [marker])

  return (
    <div
      className={ClassNames('informations-panel', className, {
        open: isOpen,
      })}
    >
      {travelTime && (
        <div className="informations-panel__direction-informations">
          <WalkIco className="informations-panel__direction-informations__walk-ico" />
          <span className="informations-panel__direction-informations__direction-duration">
            {travelTime} min
          </span>
        </div>
      )}
      {installationTargetDescription && (
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
        <span className="informations-panel__informations--installation__installation-name">
          {installationTargetName}
        </span>
        <span className="informations-panel__informations--installation__installation-description">
          {installationTargetDescription}
        </span>
      </div>
      {marker && marker.properties && (
        <Button
          theme={themes.Blue}
          label="En savoir plus"
          link={`/installation/${marker.properties._id}`}
          className="informations-panel__informations--installation__installation-see-more"
        />
      )}
      {!isTourStarted && (
        <Button
          onClick={onButtonClick}
          label={'Calculer mon itinéraire'}
          theme={ButtonThemes.Blue}
          className={'informations-panel__set-direction-button'}
        />
      )}
    </div>
  )
}

export default observer(InformationsPanel)
