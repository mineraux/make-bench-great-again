import { action, observable } from 'mobx'

class InstallationStore {
  @observable scrollProgressFirstPart: number = 0

  @observable scrollProgressFirstPartTestimonyPlayer: number = 0

  @observable isFirstPartPlayerPlaying: boolean = false

  @observable isTwitterLiveReload: boolean = false

  @action public setScrollProgressFirstPart = (scroll: number) => {
    this.scrollProgressFirstPart = scroll
  }

  @action public setScrollProgressFirstPartTestimonyPlayer = (
    scroll: number
  ) => {
    this.scrollProgressFirstPartTestimonyPlayer = scroll
  }

  @action public setIsFirstPartPlayerPlaying = (isPlaying: boolean) => {
    this.isFirstPartPlayerPlaying = isPlaying
  }

  @action public setIsTwitterLiveReload = (isLiveReload: boolean) => {
    this.isTwitterLiveReload = isLiveReload
  }
}

export default new InstallationStore()
