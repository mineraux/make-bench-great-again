import { action, observable } from 'mobx'

type currentPagePathType = string | null
type nextPagePathType = string | null
type isMenuOpenType = boolean

class NavigationStore {
  @observable currentPagePath: currentPagePathType = null

  @observable nextPagePath: nextPagePathType = null

  @observable isMenuOpen = false

  @action setCurrentPagePath = (value: currentPagePathType): void => {
    this.currentPagePath = value
  }

  @action setNextPagePath = (value: nextPagePathType): void => {
    this.nextPagePath = value
  }

  @action setIsMenuOpen = (value: isMenuOpenType): void => {
    this.isMenuOpen = value
  }
}

export default new NavigationStore()
