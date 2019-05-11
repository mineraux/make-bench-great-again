import React, { Component } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import { InstallationStore } from '../../store'
import { ApiInstallation } from '../../@types'

type Props = pageProps & {}

type stateInstallation = {
  installation: ApiInstallation
}

class Installation extends Component<Props, stateInstallation> {
  constructor(props: Props) {
    super(props)

    this.state = {
      installation: {
        _id: '',
      },
    }
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.state &&
      this.state.installation._id.length === 0
    ) {
      this.getInstallationInformation()
    }
  }

  componentDidUpdate() {
    if (
      this.props.match &&
      this.state &&
      this.state.installation._id.length === 0
    ) {
      this.getInstallationInformation()
    }
  }

  async getInstallationInformation() {
    await InstallationStore.fetchSingleInstallation(
      this.props.match.params.installationId,
      {
        name: true,
      }
    ).then(res => {
      this.setState({ installation: res })
    })
  }

  render() {
    return (
      <div className="page-installation">
        {this.state && <p>{this.state.installation.name}</p>}
      </div>
    )
  }
}

export default Installation
