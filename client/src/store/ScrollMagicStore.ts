import { action, observable } from 'mobx'

class InstallationStore {
  @observable scrollProgressFirstPart: number = 0

  @action public setScrollProgressFirstPart = (scroll: number) => {
    this.scrollProgressFirstPart = scroll
  }
}

export default new InstallationStore()
