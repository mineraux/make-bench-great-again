import React, { Component } from 'react';
import DebugPanel from './components/debug/DebugPanel';
import { BrowserRouter, Route } from 'react-router-dom';
//pages
import Home from './pages/Home/Home'
import Map from './pages/Map/Map'
import Nav from "./components/Nav/Nav";

class App extends Component {
  render() {
    return (
      <div className="app">
        <DebugPanel />
        <BrowserRouter>

          <Nav links={[
            {
              link: "/",
              label: 'Home'
            },
            {
              link: "/map",
              label: "Map"
            }
          ]}/>

          <Route path="/" exact>
            {({match}) => <Home show={match !== null}/>}
          </Route>
          <Route path="/map">
            {({match}) => <Map show={match !== null}/>}
          </Route>

        </BrowserRouter>

      </div>
    );
  }
}

export default App;
