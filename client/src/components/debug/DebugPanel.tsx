import React, { FunctionComponent, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Store from '../../store/Store'
import DebugStore from '../../store/DebugStore';
import DebugButton from './DebugButton';
import './debugPanel.scss'

const DebugPanel: FunctionComponent = () => {

  const { benchList, fetchBenchList } = Store
  const { debug } = DebugStore

  const queryName = async () => {
    await fetchBenchList({ name: true })
  }

  const queryDesc = async () => {
    await fetchBenchList({ description: true })
  }

  const queryGeoAndDesc = async () => {
    await fetchBenchList({ geolocation: true, description: true })
  }

  return (
    <>
      <DebugButton />
      {debug &&
        <div className="debug-panel">
          <h2>Debug interface</h2>
          <div>
            <h3>Bench list</h3>
            <ul>
              {
                benchList.map((bench, index) => (
                  <li key={index}>
                    {bench._id && <p>{bench._id}</p>}
                    {bench.name && <p>{bench.name}</p>}
                    {bench.description && <p>{bench.description}</p>}
                    {bench.lockedDescription && <p>{bench.lockedDescription}</p>}
                    {bench.geolocation && <p>{bench.geolocation.map((item, index) => (
                      <span key={index}>{item} </span>)
                    )}</p>
                    }
                  </li>
                ))
              }
            </ul>
          </div>
          <button onClick={queryName}>Query le nom des installations</button>
          <button onClick={queryDesc}>Query la description</button>
          <button onClick={queryGeoAndDesc}>Query la geoloc et la description</button>
        </div>}
    </>
  )
}

export default observer(DebugPanel)