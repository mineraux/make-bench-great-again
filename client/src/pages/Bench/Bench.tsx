import React, { Component } from 'react';
import Transition from './Transition';
import { pageProps } from "../types";
import Store from '../../store/Store';
import { ApiBench } from '../../@types';

type props = pageProps & {}

type stateBench = {
  bench: ApiBench
}

class Bench extends Component<props, stateBench> {

  constructor(props: props) {
    super(props)

    this.state = {
      bench: {
        _id: ""
      }
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
    await Store.fetchSingleBench(this.props.match.params.benchId, { name: true })
      .then(res => {
        this.setState({ bench: res })
      })
  }

  render() {
    const { show } = this.props

    return (
      <Transition show={show}>
        <div className="page-bench">
          {this.state && <p>{this.state.bench.name}</p>}
        </div>
      </Transition>

    )
  }
}

export default Bench;