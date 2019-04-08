import React, { FunctionComponent, useCallback } from 'react'
import ApiClient from '../../clients/ApiClient';
import { observer } from 'mobx-react-lite'
import Store from '../../store/Store'

const DebugPanel: FunctionComponent = () => {

  const {benchList, fetchBenchList} = Store

    const getInstallationList = async () => {
      await fetchBenchList()
    }

    return (
      <div className="debug-panel">
        <h2>Debug interface</h2>
        <div>
          <h3>Bench list</h3>
          <ul>
            {
              benchList.map((bench, index) => (
                <li key={index}>
                  <span>{bench.name}</span>
                </li>
              ))
            }
          </ul>
        </div>
        <button onClick={getInstallationList}>Query toutes les installation</button>
      </div>
    )
}

export default observer(DebugPanel)