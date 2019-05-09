import { action, observable } from 'mobx'

import { themes as headerThemes } from '../components/Header/Header'

type currentPagePathType = string | null
type nextPagePathType = string | null
type isMenuOpenType = boolean
type scrollProgressionType = number
type headerTitleType = string

class NavigationStore {
  @observable currentPagePath: currentPagePathType = null

  @observable nextPagePath: nextPagePathType = null

  @observable isMenuOpen: isMenuOpenType = false

  @observable scrollProgression: scrollProgressionType = 0.5

  @observable headerTitle: headerTitleType = 'titre'

  @observable headerTheme: headerThemes = headerThemes.Blue

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

  @action setHeaderTitle = (value: headerTitleType): void => {
    this.headerTitle = value
  }

  @action setHeaderThemes = (value: headerThemes): void => {
    this.headerTheme = value
  }
}

export default new NavigationStore()
