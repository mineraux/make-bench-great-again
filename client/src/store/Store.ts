import { action, observable } from 'mobx'
import { ApiBenchReponseRoot, QueryApiBenchReponse, ApiBench } from '../@types';
import ApiClient from '../ApiClient/ApiClient';

class Store {
  @observable benchList: ApiBenchReponseRoot = []
  @observable benchListTemp: ApiBenchReponseRoot = []

  @action public fetchBenchList = async (fieldToFetch: QueryApiBenchReponse) => {
    if (process.env.NODE_ENV === "development") {

      const data:ApiBenchReponseRoot  = (await ApiClient.getBenchList(fieldToFetch)).map(
          entry => ({... entry})
        )

      this.benchList = this.mergeById(data);

      // this.benchList = [
      //   {
      //     id: "1",
      //     name: "Bench1",
      //     description: "Desc1",
      //     lockedDescription: "Locked",
      //     geolocation: [2.402, 48.8787]
      //   },
      //   {
      //     id: "2",
      //     name: "Bench2",
      //     description: "Desc2",
      //     lockedDescription: "Locked",
      //     geolocation: [2.40764, 48.87512]
      //   },
      //   {
      //     id: "3",
      //     name: "Bench3",
      //     description: "Desc3",
      //     lockedDescription: "Locked",
      //     geolocation: [2.39636, 48.87539]
      //   }
      // ]
    }

  }

  mergeById = (data:ApiBenchReponseRoot) => {
    let mergedData
    if (this.benchList.length > 0) {
      mergedData = this.benchList.map(itm => ({
        ...data.find((item:ApiBench) =>(
          (item._id === itm._id))
          ),
        ...itm
      }));
    } else {
      mergedData = data
    }

    return mergedData
  }
    
}

export default new Store()
