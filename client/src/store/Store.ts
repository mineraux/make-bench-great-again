import { action, observable, reaction } from 'mobx'
import ApiClient from '../ApiClient/ApiClient';
import { ApiBenchReponseRoot, QueryApiBenchReponse } from '../@types';

class Store {
  @observable benchList:ApiBenchReponseRoot = []

  @action public fetchBenchList = async (fieldToFetch: QueryApiBenchReponse) => {
    this.benchList = (await ApiClient.getBenchList(fieldToFetch)).map(
      entry => ({... entry})
    )
  }
}

export default new Store()
