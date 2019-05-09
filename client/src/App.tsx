import React, { FunctionComponent } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
// store
import { NavigationStore } from './store'
// config
import config from './config/config'
// components
import DebugPanel from './components/debug/DebugPanel'
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
// styles
import './assets/styles/app.scss'

const App: FunctionComponent = () => {
  const {
    currentPagePath,
    setCurrentPagePath,
    setNextPagePath,
    headerTitle,
    headerTheme,
    isMenuOpen,
  } = NavigationStore

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
        <div className={'app__header-container'}>
          <Header
            title={headerTitle}
            theme={headerTheme}
            className="app__header-container__header"
          />
        </div>
        <Nav isOpen={isMenuOpen} links={Object.values(config.routes)} />
        {Object.values(config.routes).map(route => renderRoute(route))}
      </BrowserRouter>
    </div>
  )
}

export default observer(App)
