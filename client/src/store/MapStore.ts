import { observable, action } from 'mobx'
import { ApiInstallation } from '../@types'

class MapStore {
  @observable targetInstallation: ApiInstallation = {
    _id: '',
  }

  @observable selectedInstallation: ApiInstallation = {
    _id: '',
  }

  @action setTargetInstallation = (installation: ApiInstallation) => {
    this.targetInstallation = installation
  }

  @action setSelectedInstallation = (installation: ApiInstallation) => {
    this.selectedInstallation = installation
  }
}

export default new MapStore()
