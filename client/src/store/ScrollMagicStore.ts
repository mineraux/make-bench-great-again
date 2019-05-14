import { action, observable } from 'mobx'

class InstallationStore {
  @observable scrollProgress: number = 0
  @observable scrollProgressFirstPart: number = 0

  @action public setScrollProgress = (scroll: number) => {
    this.scrollProgress = scroll
  }

  @action public setScrollProgressFirstPart = (scroll: number) => {
    this.scrollProgressFirstPart = scroll
  }
}

export default new InstallationStore()
