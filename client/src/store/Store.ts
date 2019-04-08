import { action, observable, reaction } from 'mobx'
import ApiClient from '../clients/ApiClient';
import { ApiBenchReponseRoot } from '../@types';

class Store {
  @observable benchList:ApiBenchReponseRoot = []

  @action public fetchBenchList = async () => {
    this.benchList = (await ApiClient.getBenchList({name:true, description: true})).map(
      entry => ({... entry})
    )
  }
}

export default new Store()
