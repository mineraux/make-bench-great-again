import React, { FunctionComponent, useCallback } from 'react'
import ApiClient from '../../clients/ApiClient';
import { observer } from 'mobx-react-lite'
import Store from '../../store/Store'

const DebugPanel: FunctionComponent = () => {

  const {benchList, fetchBenchList} = Store

    const test = useCallback( async () => {
      try {
        // const response = await ApiClient.getBenchList()
        // console.log(response)
        fetchBenchList()
      } catch(err) {
        console.log(err)
      }
      // fetchBenchList()
      
    }, [])

    return (
      <div className="debug-panel">
        <h2>Debug interface</h2>
        <p>benchList = {benchList}</p>
        <button onClick={test}>Query toutes les installation</button>
      </div>
    )
  

}

export default observer(DebugPanel)