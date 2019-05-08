import { action, observable } from 'mobx'
import {
  ApiInstallationReponseRoot,
  QueryApiInstallationReponse,
  ApiInstallation,
  ApiSingleInstallationReponseRoot,
} from '../@types'
import ApiClient from '../ApiClient/ApiClient'

class Store {
  @observable installationList: ApiInstallationReponseRoot = []
  @observable installationListTemp: ApiInstallationReponseRoot = []

  @action public fetchInstallationList = async (
    fieldToFetch: QueryApiInstallationReponse
  ) => {
    if (process.env.NODE_ENV !== 'development') {
      this.installationList = [
        {
          _id: '1',
          name: 'L’Exedros',
          description:
            'Vestige du 19e siècle, cette sculpture aux courbes parfaites...',
          lockedDescription: 'Locked',
          geolocation: [2.402, 48.8787],
        },
        {
          _id: '2',
          name: 'Super banc',
          description:
            'Vestige du 19e siècle, cette sculpture aux courbes parfaites...',
          lockedDescription: 'Locked',
          geolocation: [2.40764, 48.87512],
        },
        {
          _id: '3',
          name: 'Enorme celui là',
          description:
            'Vestige du 19e siècle, cette sculpture aux courbes parfaites...',
          lockedDescription: 'Locked',
          geolocation: [2.39636, 48.87539],
        },
      ]
    } else {
      const data: ApiInstallationReponseRoot = (await ApiClient.getInstallationList(
        fieldToFetch
      )).map(entry => ({ ...entry }))

      this.installationList = this.mergeById(data)
    }
  }

  @action public fetchSingleInstallation = async (
    installationID: ApiInstallation['_id'],
    fieldToFetch: QueryApiInstallationReponse
  ): Promise<ApiInstallation> => {
    const data: ApiSingleInstallationReponseRoot = await ApiClient.getSingleInstallation(
      installationID,
      fieldToFetch
    )

    this.installationList = this.mergeById([data])
    return data
  }

  mergeById = (data: ApiInstallationReponseRoot) => {
    let mergedData
    if (this.installationList.length > 0) {
      mergedData = this.installationList.map(itm => ({
        ...data.find((item: ApiInstallation) => item._id === itm._id),
        ...itm,
      }))
    } else {
      mergedData = data
    }

    return mergedData
  }
}

export default new Store()
