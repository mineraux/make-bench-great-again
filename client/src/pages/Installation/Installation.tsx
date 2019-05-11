import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import { InstallationStore } from '../../store'
import { ApiInstallation } from '../../@types'
import './installation.scss'
import ScrollMagicController from './ScrollMagicController'
import BenchImg from '../../assets/images/bench.png'
import DummyPlayer from '../../assets/images/dummy_player.png'

type Props = pageProps & {}

const Installation: FunctionComponent<Props> = ({ show, match }) => {
  const [installation, setInstallation] = useState<ApiInstallation>({ _id: '' })

  useEffect(() => {
    if (match && installation._id.length === 0) {
      getInstallationInformation()
    }
  }, [])

  const getInstallationInformation = async () => {
    await InstallationStore.fetchSingleInstallation(
      match.params.installationId,
      {
        name: true,
        description: true,
        lockedDescription: true,
      }
    )
      .then(res => {
        setInstallation(res)
      })
      .then(() => {
        ScrollMagicController.initController()
      })
  }

  return (
    <Transition show={show}>
      <div className="page-installation">
        <div className="part1">
          <div className="page-installation__presentation">
            <p className="page-installation__title">{installation.name}</p>
            <img
              className="page-installation__presentation__installation-sketch"
              src={BenchImg}
              alt=""
            />
            <div className="page-installation__text-content-wrapper">
              <p className="page-installation__text-content page-installation__presentation__installation-locked-description">
                {installation.lockedDescription}
              </p>
            </div>
          </div>

          <div className="page-installation__testimony">
            <p className="page-installation__title">Témoignage</p>
            <img
              className="page-installation__testimony__player"
              src={DummyPlayer}
              alt=""
            />
            <div className="page-installation__text-content-wrapper page-installation__testimony__text-content-wrapper">
              <p className="page-installation__text-content">
                Ouais ouais les bancs ça pique. Jui plus apte à rester ici moi
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Installation
