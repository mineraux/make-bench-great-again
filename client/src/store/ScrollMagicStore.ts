import { action, observable } from 'mobx'

class InstallationStore {
  @observable scrollProgress: number = 0

  @action public setScrollProgress = (scroll: number) => {
    this.scrollProgress = scroll
  }
}

export default new InstallationStore()
