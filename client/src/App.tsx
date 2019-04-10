import React, { Component } from 'react';
import DebugPanel from './components/debug/DebugPanel';
import ProtoMap from './components/map/ProtoMap'

class App extends Component {
  render() {
    return (
      <div className="App">
      <DebugPanel />
      <ProtoMap />
      </div>
    );
  }
}

export default App;
