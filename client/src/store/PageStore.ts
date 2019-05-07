import { action, observable } from 'mobx'

type currentPagePathType = string | null
type nextPagePathType = string | null

class PageStore {
  @observable currentPagePath: currentPagePathType = null

  @observable nextPagePath: nextPagePathType = null

  @action public setCurrentPagePath = (value: currentPagePathType): void => {
    this.currentPagePath = value
  }

  @action public setNextPagePath = (value: nextPagePathType): void => {
    this.nextPagePath = value
  }
}

export default new PageStore()
