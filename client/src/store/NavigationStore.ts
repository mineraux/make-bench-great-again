import { action, observable } from 'mobx'

import { themes as headerThemes } from '../components/Header/Header'
import { themes as mapButtonThemes } from '../components/MapButton/MapButton'
import { themes as scrolIndicationThemes } from '../components/ScrollIndication/ScrollIndication'

type previousPagePathType = string | null
type currentPagePathType = string | null
type nextPagePathType = string | null
type isMenuOpenType = boolean
type isDevNavOpenType = boolean
type isMapButtonVisibleType = boolean
type isMapButtonMenuType = boolean
type scrollProgressionType = number
type isHeaderVisibleType = boolean
type headerTitleType = string
type isScrollIndicationVisible = boolean
type isScrollIndicationTextVisible = boolean

class NavigationStore {
  // page path

  @observable previousPagePath: previousPagePathType = null

  @observable currentPagePath: currentPagePathType = null

  @observable nextPagePath: nextPagePathType = null

  // menu

  @observable isMenuOpen: isMenuOpenType = false

  @observable isDevNavOpen: isMenuOpenType = false

  // map button

  @observable isMapButtonVisible: isMapButtonVisibleType = false

  @observable isMapButtonMenu: isMapButtonMenuType = false

  @observable mapButtonTheme: mapButtonThemes = mapButtonThemes.Pink

  // scroll progression

  @observable scrollProgression: scrollProgressionType = 0

  // header

  @observable isHeaderVisible: isHeaderVisibleType = false

  @observable headerTitle: headerTitleType = "L'envers du décor"

  @observable headerTheme: headerThemes = headerThemes.Blue

  // scroll indication

  @observable isScrollIndicationVisible: isScrollIndicationVisible = false

  @observable
  isScrollIndicationTextVisible: isScrollIndicationTextVisible = true

  @observable scrollIndicationTheme: scrolIndicationThemes =
    scrolIndicationThemes.Green

  // ACTIONS

  @action setPreviousPagePath = (value: previousPagePathType): void => {
    this.previousPagePath = value
  }

  @action setCurrentPagePath = (value: currentPagePathType): void => {
    this.setPreviousPagePath(this.currentPagePath)
    this.currentPagePath = value
  }

  @action setNextPagePath = (value: nextPagePathType): void => {
    this.nextPagePath = value
  }

  @action setIsMenuOpen = (value: isMenuOpenType): void => {
    this.isMenuOpen = value
  }

  @action setIsDevNavOpen = (value: isDevNavOpenType): void => {
    this.isDevNavOpen = value
  }

  @action setIsMapButtonVisible = (value: isMapButtonVisibleType): void => {
    this.isMapButtonVisible = value
  }

  @action setIsMapButtonMenu = (value: isMapButtonMenuType): void => {
    this.isMapButtonMenu = value
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

  @action setIsScrollIndicationVisible = (
    value: isScrollIndicationVisible
  ): void => {
    this.isScrollIndicationVisible = value
  }

  @action setIsScrollIndicationTextVisible = (
    value: isScrollIndicationTextVisible
  ): void => {
    this.isScrollIndicationTextVisible = value
  }

  @action setScrollIndicationTheme = (value: scrolIndicationThemes): void => {
    this.scrollIndicationTheme = value
  }
}

export default new NavigationStore()
