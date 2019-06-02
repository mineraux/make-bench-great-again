import React, { FunctionComponent, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Feature } from 'geojson'
import ClassNames from 'classnames'
import './informationsPanel.scss'
import Button, { themes as ButtonThemes } from '../../components/Button/Button'
import { ReactComponent as CrossIco } from '../../assets/images/close_ico.svg'
import { ReactComponent as WalkIco } from '../../assets/images/ico_walk.svg'
import { Coords } from '../../@types'
import { featureCoords } from '../../utils/map'
import GeoLocationController from '../map/GeoLocationController'
import { MapStore, InstallationStore } from '../../store'

interface Props {
  marker: Feature
  travelTime: Number
  className?: string
  onButtonClick: any
  isTourStarted: boolean
  userLocation: Coords
  targetInstallationID: string
}

const InformationsPanel: FunctionComponent<Props> = ({
  marker,
  travelTime,
  className,
  onButtonClick,
  userLocation,
  targetInstallationID,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [installationTargetName, setInstallationTargetName] = useState(
    'Choisissez une oeuvre'
  )
  const [
    installationTargetDescription,
    setInstallationTargetDescription,
  ] = useState()

  const [isCurrentTargetMatching, setIsCurrentTargetMatching] = useState(true)

  useEffect(() => {
    if (marker && marker.properties) {
      setInstallationTargetName(marker.properties.name)
      setInstallationTargetDescription(marker.properties.description)
      setIsOpen(true)
    }
  }, [marker])

  useEffect(() => {
    if (marker && marker.properties && marker.properties._id) {
      if (targetInstallationID === marker.properties._id) {
        setIsCurrentTargetMatching(true)
      } else {
        setIsCurrentTargetMatching(false)
      }
    }
  }, [marker, targetInstallationID])

  const onClickSeeMore = () => {
    const distance = GeoLocationController.getDistanceToMarker(
      featureCoords(marker),
      userLocation
    )

    // if distance < 10 meters
    if (distance < 10) {
      if (
        !InstallationStore.isInstallationUnlocked(
          MapStore.selectedInstallation._id
        )
      ) {
        InstallationStore.addUnlockedInstallation(
          MapStore.selectedInstallation._id
        )
      }
    }
  }

  return (
    <div
      className={ClassNames('informations-panel', className, {
        open: isOpen,
      })}
    >
      {travelTime && travelTime > 0 && isCurrentTargetMatching && (
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
          theme={ButtonThemes.Blue}
          label="En savoir plus"
          onClick={onClickSeeMore}
          link={`/installation/${marker.properties.slug}`}
          className="informations-panel__informations--installation__installation-see-more"
        />
      )}
      {!isCurrentTargetMatching && userLocation && (
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
