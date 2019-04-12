import React, {Component} from 'react';
import {Transition } from 'react-transition-group';
import {TweenLite} from 'gsap';
import ProtoMap from '../../components/map/ProtoMap';
import {pageProps} from "../types";

type props = pageProps & {}

class Map extends Component<props> {

  render() {
    const {show} = this.props
    return (
      <Transition
        unmountOnExit
        
        in={show}
        timeout={8000}
        onEnter={node => TweenLite.set(node, {
          autoAlpha: 0,
          x: -50
        })}
        addEndListener={(node, done) => {
          TweenLite.to(node, 0.5, {
            autoAlpha: show ? 1 : 0,
            x: show ? 0 : 50,
            onComplete: done
          });
        }}
      >
        <div className={"page-map"}>
          <p>Page : Map</p>
          <ProtoMap />
        </div>
      </Transition>

    )
  }
}

export default Map;