import { action, observable } from 'mobx'

type pageExitingType = boolean
type currentPagePathType = string | null

class PageStore {
  @observable pageExiting: pageExitingType = false

  @action public setPageExiting = (value: pageExitingType): void => {
    this.pageExiting = value
  }

  @observable currentPagePath: currentPagePathType = null

  @action public setCurrentPagePath = (value: currentPagePathType): void => {
    this.currentPagePath = value
  }

}

export default new PageStore()
