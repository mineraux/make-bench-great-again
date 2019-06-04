import { observable, action } from 'mobx'
import { ApiInstallation } from '../@types'

class MapStore {
  @observable targetInstallation: ApiInstallation = {
    _id: '',
  }

  @observable selectedInstallation: ApiInstallation = {
    _id: '',
  }

  @observable calculatePathFromAnotherPage: boolean = false

  @action setTargetInstallation = (installation: ApiInstallation) => {
    this.targetInstallation = installation
  }

  @action setSelectedInstallation = (installation: ApiInstallation) => {
    this.selectedInstallation = installation
  }

  @action setCalculatePathFromAnotherPage = (state: boolean) => {
    this.calculatePathFromAnotherPage = state
  }
}

export default new MapStore()
