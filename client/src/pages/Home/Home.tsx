import React, {Component} from 'react';
import Transition from './Transition'
import {pageProps} from "../types";

type props = pageProps & {}

class Home extends Component<props> {

  render() {
    const {show} = this.props
    return (
      <Transition show={show}>
        <div className={"page-home"}>
          <p>Page : Home</p>
        </div>
      </Transition>
    )
  }
}

export default Home;