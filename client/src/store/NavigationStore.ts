import { action, observable } from 'mobx'

type currentPagePathType = string | null
type nextPagePathType = string | null
type isMenuOpenType = boolean
type scrollProgressionType = number

class NavigationStore {
  @observable currentPagePath: currentPagePathType = null

  @observable nextPagePath: nextPagePathType = null

  @observable isMenuOpen: isMenuOpenType = false

  @observable scrollProgression: scrollProgressionType = 0.5

  @action setCurrentPagePath = (value: currentPagePathType): void => {
    this.currentPagePath = value
  }

  @action setNextPagePath = (value: nextPagePathType): void => {
    this.nextPagePath = value
  }

  @action setIsMenuOpen = (value: isMenuOpenType): void => {
    this.isMenuOpen = value
  }

  @action setScrollProgression = (value: scrollProgressionType): void => {
    this.scrollProgression = value
  }
}

export default new NavigationStore()
