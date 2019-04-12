import { action, observable } from 'mobx'
import { ApiBenchReponseRoot, QueryApiBenchReponse, ApiBenchReponseRootTemp, ApiBenchTemp } from '../@types';

class Store {
  @observable benchList: ApiBenchReponseRoot = []
  @observable benchListTemp: ApiBenchReponseRoot = []

  /**
   * Recuperer des infos spécifiques
   * Merge au tableau déjà existant dans le store =>
   * Ajout des données récuperer sans écrasé les précédentes données
   */

  @action public fetchBenchList = async (dataToLoad?: string, fieldToFetch?: QueryApiBenchReponse) => {
    if (process.env.NODE_ENV === "development") {

      const nameGeoData: ApiBenchReponseRootTemp = [
        {
          id: 1,
          name: "Bench1",
        },
        {
          id: 2,
          name: "Bench2",
        },
        {
          id: 3,
          name: "Bench3",
        }
      ]

      const descData: ApiBenchReponseRootTemp = [
        {
          id: 1,
          description: "Desc1",
        },
        {
          id: 2,
          description: "Desc2",
        },
        {
          id: 3,
          description: "Desc3",
        }
      ]

      let data: ApiBenchReponseRootTemp

      dataToLoad === "nameGeo" ? data = nameGeoData : data = descData

      const mergeById = (array1:ApiBenchReponseRootTemp, array2:ApiBenchReponseRootTemp) =>
      array1.map(itm => ({
          ...array2.find((item:any) => (item.id === itm.id) && item),
          ...itm
        }));

      this.benchListTemp = mergeById(data, this.benchListTemp);

      this.benchList = [
        {
          name: "Bench1",
          description: "Desc1",
          lockedDescription: "Locked",
          geolocation: [2.402, 48.8787]
        },
        {
          name: "Bench2",
          description: "Desc2",
          lockedDescription: "Locked",
          geolocation: [2.40764, 48.87512]
        },
        {
          name: "Bench3",
          description: "Desc3",
          lockedDescription: "Locked",
          geolocation: [2.39636, 48.87539]
        }
      ]
    } else {
      // this.benchList = (await ApiClient.getBenchList(fieldToFetch)).map(
      //   entry => ({... entry})
      // )
    }

  }
}

export default new Store()
