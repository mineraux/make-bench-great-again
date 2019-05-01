import React, { Component } from 'react'
import DebugPanel from './components/debug/DebugPanel'
import { BrowserRouter, Route } from 'react-router-dom'
//pages
import Nav from './components/Nav/Nav'
//config
import config from './config/config'

class App extends Component {
  render() {
    return (
      <div className="app">
        <DebugPanel />
        <BrowserRouter>
          <Nav links={Object.values(config.routes)} />

          {Object.values(config.routes).map(route => (
            <Route key={route.path} path={route.path} exact>
              {({ match }) => (
                <route.component show={match !== null} match={match} />
              )}
            </Route>
          ))}
        </BrowserRouter>
      </div>
    )
  }
}

export default App
