import React, { FunctionComponent } from 'react'
import DebugPanel from './components/debug/DebugPanel'
import { BrowserRouter, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import PageStore from './store/PageStore'
// pages
import Nav from './components/Nav/Nav'
// config
import config from './config/config'

const App: FunctionComponent = () => {
  const { currentPagePath, setCurrentPagePath, setNextPagePath } = PageStore

  const renderRoute = (route: any) => {
    return (
      <Route key={route.path} path={route.path} exact>
        {({ match }) => {
          // init currentPagePath if is not set
          if (match && currentPagePath === null) {
            setCurrentPagePath(match.path)
          }
          // If page match but is not current page in store : Queue page to nextPagePath
          if (match && currentPagePath !== match.path) {
            setNextPagePath(match.path)
          }
          return (
            <route.component
              show={
                match !== null &&
                (currentPagePath === match.path || currentPagePath === null)
              }
              match={match}
            />
          )
        }}
      </Route>
    )
  }

  return (
    <div className="app">
      <DebugPanel />
      <BrowserRouter>
        <Nav links={Object.values(config.routes)} />
        {Object.values(config.routes).map(route => renderRoute(route))}
      </BrowserRouter>
    </div>
  )
}

export default observer(App)
