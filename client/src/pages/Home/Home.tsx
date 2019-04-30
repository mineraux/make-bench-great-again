import React, {Component} from 'react';
import {Transition } from 'react-transition-group';
import {TweenLite} from 'gsap';
import {pageProps} from "../types";

type props = pageProps & {}

class Home extends Component<props> {

  render() {
    const {show} = this.props
    return (
      <Transition
        unmountOnExit
        in={show}
        timeout={1000}
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
        <div className={"page-home"}>
          <p>Page : Home</p>
        </div>
      </Transition>

    )
  }
}

export default Home;