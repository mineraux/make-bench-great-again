import { action, observable } from 'mobx'
import {
  ApiInstallationReponseRoot,
  QueryApiInstallationReponse,
  ApiInstallation,
  ApiSingleInstallationReponseRoot,
} from '../@types'
import ApiClient from '../ApiClient/ApiClient'

class InstallationStore {
  @observable installationList: ApiInstallationReponseRoot = []
  @observable installationListTemp: ApiInstallationReponseRoot = []

  @action public fetchInstallationList = async (
    fieldToFetch: QueryApiInstallationReponse
  ) => {
    if (process.env.NODE_ENV === 'development') {
      this.installationList = [
        {
          _id: '1',
          slug: 'exedros',
          name: 'L’Exedros',
          description:
            'Vestige du 19e siècle, cette sculpture aux courbes parfaites...',
          lockedDescription:
            'Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle.Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle. Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle.Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle',
          geolocation: [2.402, 48.8787],
        },
        {
          _id: '2',
          slug: 'glissant',
          name: 'Super banc',
          description:
            'Vestige du 19e siècle, cette sculpture aux courbes parfaites...',
          lockedDescription:
            'Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle.Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle. Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle.Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle',
          geolocation: [2.40764, 48.87512],
        },
        {
          _id: '3',
          slug: 'piquant',
          name: 'Ça pique',
          description:
            'Vestige du 19e siècle, cette sculpture aux courbes parfaites...',
          lockedDescription:
            'Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle.Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle. Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle.Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans domicile fixes de s’allonger.Cette assise publique voit le jour dans l’écrin Parisien que constitue le boulevard Président Wilson en 2016. Son succès est tel qu’elle',
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
    let data: ApiSingleInstallationReponseRoot = {
      _id: '',
    }

    if (process.env.NODE_ENV === 'development') {
      this.installationList.map(installation => {
        if (installation._id === installationID) {
          data = installation
        }
      })
    } else {
      data = await ApiClient.getSingleInstallation(installationID, fieldToFetch)
    }

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

export default new InstallationStore()
