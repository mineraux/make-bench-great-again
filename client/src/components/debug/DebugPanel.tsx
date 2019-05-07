import React, { FunctionComponent, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Store from '../../store/Store'
import DebugStore from '../../store/DebugStore'
import DebugButton from './DebugButton'
import './debugPanel.scss'

const DebugPanel: FunctionComponent = () => {
  const { benchList, fetchBenchList, fetchSingleBench } = Store
  const { debug } = DebugStore
  const [isBenchListDisplayed, setIsBenchListDisplayed] = useState(false)

  const queryName = async () => {
    await fetchBenchList({ name: true })
  }

  const queryGeoAndDesc = async () => {
    await fetchBenchList({ geolocation: true, description: true })
  }

  const queryOneBench = async () => {
    await fetchSingleBench('5cc8779779be4460aef65efc', { name: true })
  }

  return (
    <>
      <DebugButton />
      {debug && (
        <div className="debug-panel">
          <h2>Debug interface</h2>
          {isBenchListDisplayed && (
            <div>
              <h3>Bench list</h3>
              <ul>
                {benchList.map((bench, index) => (
                  <li key={index}>
                    {bench._id && <p>{bench._id}</p>}
                    {bench.name && <p>{bench.name}</p>}
                    {bench.description && <p>{bench.description}</p>}
                    {bench.lockedDescription && (
                      <p>{bench.lockedDescription}</p>
                    )}
                    {bench.geolocation && (
                      <p>
                        {bench.geolocation.map((item, index2) => (
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
              onClick={() => setIsBenchListDisplayed(!isBenchListDisplayed)}
            >
              Afficher/Cacher la liste des installations
            </button>
            /* tslint:enable:jsx-no-lambda */
          }
          <button onClick={queryName}>Query le nom des installations</button>
          <button onClick={queryGeoAndDesc}>
            Query la geoloc et la description
          </button>
          <button onClick={queryOneBench}>Query les infos d'un banc</button>
        </div>
      )}
    </>
  )
}

export default observer(DebugPanel)
