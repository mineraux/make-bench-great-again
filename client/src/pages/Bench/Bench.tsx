import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { TweenLite } from 'gsap'
import { pageProps } from '../types'
import Store from '../../store/Store'
import { ApiBench } from '../../@types'

type props = pageProps & {}

type stateBench = {
  bench: ApiBench
}

class Bench extends Component<props, stateBench> {
  constructor(props: props) {
    super(props)

    this.state = {
      bench: {
        _id: '',
      },
    }
  }

  componentDidMount() {
    if (this.props.match && this.state && this.state.bench._id.length === 0) {
      this.getBenchInformation()
    }
  }

  componentDidUpdate() {
    if (this.props.match && this.state && this.state.bench._id.length === 0) {
      this.getBenchInformation()
    }
  }

  async getBenchInformation() {
    await Store.fetchSingleBench(this.props.match.params.benchId, {
      name: true,
    }).then(res => {
      this.setState({ bench: res })
    })
  }

  render() {
    const { show } = this.props

    return (
      <Transition
        unmountOnExit
        in={show}
        timeout={8000}
        onEnter={node =>
          TweenLite.set(node, {
            autoAlpha: 0,
            x: -50,
          })
        }
        addEndListener={(node, done) => {
          TweenLite.to(node, 0.5, {
            autoAlpha: show ? 1 : 0,
            x: show ? 0 : 50,
            onComplete: done,
          })
        }}
      >
        <div className="page-bench">
          {this.state && <p>{this.state.bench.name}</p>}
        </div>
      </Transition>
    )
  }
}

export default Bench
