import { action, observable } from 'mobx'

import { themes as headerThemes } from '../components/Header/Header'
import { themes as mapButtonThemes } from '../components/MapButton/MapButton'

type currentPagePathType = string | null
type nextPagePathType = string | null
type isMenuOpenType = boolean
type isMapButtonVisibleType = boolean
type scrollProgressionType = number
type isHeaderVisibleType = boolean
type headerTitleType = string

class NavigationStore {
  @observable currentPagePath: currentPagePathType = null

  @observable nextPagePath: nextPagePathType = null

  @observable isMenuOpen: isMenuOpenType = false

  @observable isMapButtonVisible: isMapButtonVisibleType = false

  @observable mapButtonTheme: mapButtonThemes = mapButtonThemes.Pink

  @observable scrollProgression: scrollProgressionType = 0.5

  @observable isHeaderVisible: isHeaderVisibleType = false

  @observable headerTitle: headerTitleType = 'Envers du décor'

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

  @action setIsMapButtonVisible = (value: isMapButtonVisibleType): void => {
    this.isMapButtonVisible = value
  }

  @action setMapButttonThemes = (value: mapButtonThemes): void => {
    this.mapButtonTheme = value
  }

  @action setScrollProgression = (value: scrollProgressionType): void => {
    this.scrollProgression = value
  }

  @action setIsHeaderVisible = (value: isHeaderVisibleType): void => {
    this.isHeaderVisible = value
  }

  @action setHeaderTitle = (value: headerTitleType): void => {
    this.headerTitle = value
  }

  @action setHeaderThemes = (value: headerThemes): void => {
    this.headerTheme = value
  }
}

export default new NavigationStore()
