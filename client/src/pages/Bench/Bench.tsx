import React, { Component } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import { BenchStore } from '../../store'
import { ApiBench } from '../../@types'

type Props = pageProps & {}

type stateBench = {
  bench: ApiBench
}

class Bench extends Component<Props, stateBench> {
  constructor(props: Props) {
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
    await BenchStore.fetchSingleBench(this.props.match.params.benchId, {
      name: true,
    }).then(res => {
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

export default Bench
