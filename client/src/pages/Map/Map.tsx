import React, {Component} from 'react';
import Transition from './Transition';
import {TweenLite} from 'gsap';
import ProtoMap from '../../components/map/ProtoMap';
import {pageProps} from "../types";

type props = pageProps & {}

class Map extends Component<props> {

  render() {
    const {show} = this.props
    return (
      <Transition show={show}>
        <div className={"page-map"}>
          <p>Page : Map</p>
          <ProtoMap />
        </div>
      </Transition>

    )
  }
}

export default Map;