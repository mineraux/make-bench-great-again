import React from 'react'
import { ReactComponent as BugIcon } from '../../assets/images/bug.svg'
import DebugStore from '../../store/DebugStore'
import './debugButton.scss'

const DebugButton = () => {
	return (
		<button className="debug-panel__button" onClick={DebugStore.toggleDebug}><BugIcon /></button>
	)
}

export default DebugButton