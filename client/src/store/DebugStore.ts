import { action, observable } from 'mobx'

class DebugStore {
  @observable debug = false

  @action public showDebug = () => {
    this.debug = true
  }

  @action public hideDebug = () => {
    this.debug = false
  }

  @action public toggleDebug = () => {
    this.debug = !this.debug
  }
}

export default new DebugStore()
