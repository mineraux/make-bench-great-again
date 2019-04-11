import React, { FunctionComponent, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Store from '../../store/Store'
import DebugStore from '../../store/DebugStore';
import DebugButton from './DebugButton';
import './debugPanel.scss'

const DebugPanel: FunctionComponent = () => {

  const {benchList, fetchBenchList} = Store
  const { debug } = DebugStore

    const getInstallationList = async() => {
      await fetchBenchList({name:true, description: true, geolocation: true})
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
                  {bench.name && <p>{bench.name}</p>}
                  {bench.description && <p>{bench.description}</p>}
                  {bench.lockedDescription && <p>{bench.lockedDescription}</p>}
                  {bench.geolocation && bench.geolocation.map((item, index) => <p key={index}>{item}</p>)
                  }
                </li>
              ))
            }
          </ul>
        </div>
        <button onClick={getInstallationList}>Query toutes les installation</button>
      </div>}
      </>
    )
}

export default observer(DebugPanel)