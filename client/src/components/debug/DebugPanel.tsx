import React, { FunctionComponent, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { InstallationStore } from '../../store'
import { DebugStore } from '../../store'
import DebugButton from './DebugButton'
import './debugPanel.scss'

const DebugPanel: FunctionComponent = () => {
  const {
    installationList,
    fetchInstallationList,
    fetchSingleInstallation,
  } = InstallationStore
  const { debug } = DebugStore
  const [
    isInstallationListDisplayed,
    setIsInstallationListDisplayed,
  ] = useState(false)

  const queryName = async () => {
    await fetchInstallationList({ name: true })
  }

  const queryGeoAndDesc = async () => {
    await fetchInstallationList({ geolocation: true, description: true })
  }

  const queryOneInstallation = async () => {
    await fetchSingleInstallation({ name: true }, '5cc8779779be4460aef65efc')
  }

  return (
    <>
      <DebugButton />
      {debug && (
        <div className="debug-panel">
          <h2>Debug interface</h2>
          {isInstallationListDisplayed && (
            <div>
              <h3>Installation list</h3>
              <ul>
                {installationList.map((installation, index) => (
                  <li key={index}>
                    {installation._id && <p>{installation._id}</p>}
                    {installation.name && <p>{installation.name}</p>}
                    {installation.description && (
                      <p>{installation.description}</p>
                    )}
                    {installation.lockedDescription && (
                      <p>{installation.lockedDescription}</p>
                    )}
                    {installation.geolocation && (
                      <p>
                        {installation.geolocation.map((item, index2) => (
                          <span key={index2}>{item} </span>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {
            /* tslint:disable:jsx-no-lambda */
            <button
              onClick={() =>
                setIsInstallationListDisplayed(!isInstallationListDisplayed)
              }
            >
              Afficher/Cacher la liste des installations
            </button>
            /* tslint:enable:jsx-no-lambda */
          }
          <button onClick={queryName}>Query le nom des installations</button>
          <button onClick={queryGeoAndDesc}>
            Query la geoloc et la description
          </button>
          <button onClick={queryOneInstallation}>
            Query les infos d'un banc
          </button>
        </div>
      )}
    </>
  )
}

export default observer(DebugPanel)
