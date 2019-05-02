import { action, observable } from 'mobx'

type currentPagePathType = string | null
type nextPagePathType = string | null

class PageStore {

  @observable currentPagePath: currentPagePathType = null

  @action public setCurrentPagePath = (value: currentPagePathType): void => {
    this.currentPagePath = value
  }

  @observable nextPagePath: nextPagePathType = null

  @action public setNextPagePath = (value: nextPagePathType): void => {
    this.nextPagePath = value
  }

}

export default new PageStore()
