import { observable, action } from 'mobx'
import { ApiInstallation } from '../@types'

class MapStore {
  @observable targetInstallation: ApiInstallation = {
    _id: '',
    name: "l'Exedros",
  }

  @action setTargetInstallation = (installation: ApiInstallation) => {
    this.targetInstallation = installation
  }
}

export default new MapStore()
