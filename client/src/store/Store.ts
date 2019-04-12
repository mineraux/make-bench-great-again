import { action, observable } from 'mobx'
import ApiClient from '../ApiClient/ApiClient';
import { ApiBenchReponseRoot, QueryApiBenchReponse } from '../@types';

class Store {
  @observable benchList:ApiBenchReponseRoot = []

  @action public fetchBenchList = async (fieldToFetch: QueryApiBenchReponse) => {
    if (process.env.NODE_ENV === "development") {
      this.benchList = [
        {
          name: "Bench1",
          description: "Desc1",
          lockedDescription: "Locked",       
          geolocation: [2.402,48.8787]
        },
        {
          name: "Bench2",
          description: "Desc2",
          lockedDescription: "Locked",
          geolocation: [2.40764,48.87512]
        },
        {
          name: "Bench3",
          description: "Desc3",
          lockedDescription: "Locked",
          geolocation: [2.39636,48.87539]
        }
      ]      
    } else {
      this.benchList = (await ApiClient.getBenchList(fieldToFetch)).map(
        entry => ({... entry})
      )
    }
    
  }
}

export default new Store()
