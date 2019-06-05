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
  @observable unlockedInstallations: string[] = []

  @action public fetchInstallationList = async (
    fieldToFetch: QueryApiInstallationReponse
  ) => {
    if (process.env.NODE_ENV === 'development') {
      this.installationList = [
        {
          _id: '1',
          slug: 'exedros',
          name: 'Exedros',
          lockedName: 'Pas pratique',
          caption:
            'Exedros, Fonte, résine de couleur “vert papier russe”, H. : 150 L. : 70cm, 2016',
          description:
            'Conçue par Marc Aurel comme une véritable ode à la nature, sa structure en courbes rappelle la forme délicate et organique des feuillages, ramenant une touche printanière dans la ville. Au cours de cette expérience, L’Exedros questionne la place de la nature dans la ville.',
          lockedDescription:
            'Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans-domicile fixes de s’allonger. Cette assise publique voit le jour boulevard Président Wilson en 2016. Son succès est tel qu’elle s’étendra dans toute la capitale. Inventés par JC. Decaux et Marc Aurel, ces bancs fleurissent au pied des arbres, à proximité des abribus.',
          geolocation: [2.402, 48.8787],
          hashTags: ['Exedros'],
        },
        {
          _id: '2',
          slug: 'Miséricordieux',
          name: 'En suspens',
          lockedName: 'Miséricordieux',
          caption:
            'Super banc, Fonte, résine de couleur  “vert papier russe” H. : 150 L. : 70cm, 2016',
          description:
            'Conçue à la fin du XXe siècle, cette structure à la forme avant-gardiste suscite depuis de nombreuses années la curiosité des passants. Disposée sous-terre, cette oeuvre minimaliste interroge notre rapport au temps en nous offrant une halte dans les profondeurs de Paris.',
          lockedDescription:
            "De son vrai nom Appui ischiatique ou Miséricordieux, elle puise ses origines des miséricordes. Ces dernières étaient des aménagements apportés aux stalles pour permettre aux moines de s’appuyer ou de s’asseoir pendant les offices tout en ayant l’air d’être debout. Miséricordieux signifie avoir le cœur sensible au malheur d’autrui (du lat. miseria & cor ~ misère & cœur), ce qui constitue un paradoxe lorsqu'il s’avère que la RATP conçoit ces bancs pour repousser les sans-abri des stations de métro",
          geolocation: [2.40764, 48.87512],
          hashTags: ['enSuspens'],
        },
        {
          _id: '3',
          slug: 'lisbonne',
          name: 'La Vague',
          lockedName: 'Lisbonne',
          caption: 'La Vague, acier et fonte, H. : 75cm L. : 180cm, 2015',
          description:
            'Connu sous le pseudonyme d’Area, ce street artiste originaire de Toulouse nous offre une sculpture longiligne dont la forme ondulatoire aspire à la rêverie. Depuis 2015 des reproductions déferlent aux abords des parcs venant ponctuer les promenades estivales des parisiens. Au travers de cette expérience, l’espace public est questionné, quelle est la place de l’Homme face à ces créations ?',
          lockedDescription:
            'De son vrai nom, Lisbonne, ce banc anti-sdf à dossier est devenu la nouvelle référence en matière “de banc de repos”. Après avoir révolutionné le banc public en métal il est aujourd’hui un classique du design anti-sdf. Mobilier dissuasif par excellence car en plus d’être conçue pour repousser les sans abris, sa formes le rends impraticable auprès des skateurs et street artistes.',
          geolocation: [2.39636, 48.87539],
          hashTags: ['lisbonne'],
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
    fieldToFetch: QueryApiInstallationReponse,
    installationID?: ApiInstallation['_id'],
    installationSlug?: ApiInstallation['slug']
  ): Promise<ApiInstallation> => {
    let data: ApiSingleInstallationReponseRoot = {
      _id: '',
    }

    if (process.env.NODE_ENV === 'development') {
      this.installationList.map(installation => {
        if (installationID) {
          if (installation._id === installationID) {
            data = installation
          }
        } else if (installationSlug) {
          if (installation.slug === installationSlug) {
            data = installation
          }
        }
      })
    } else {
      data = await ApiClient.getSingleInstallation(
        installationID!,
        fieldToFetch
      )
    }

    this.installationList = this.mergeById([data])
    return data
  }

  @action public addUnlockedInstallation = (
    installationID: ApiInstallation['_id']
  ) => {
    this.unlockedInstallations.push(installationID!)

    if (!this.isInstallationInLocalStorage(installationID)) {
      localStorage.setItem(
        'unlockedInstallations',
        JSON.stringify(this.unlockedInstallations)
      )
    }
  }

  @action public setUnlockedInstallationFromLocalStorage = () => {
    const storageUnlockedInstallations = localStorage.getItem(
      'unlockedInstallations'
    )

    if (storageUnlockedInstallations) {
      JSON.parse(storageUnlockedInstallations).forEach((id: string) => {
        this.addUnlockedInstallation(id)
      })
    }
  }

  @action public removeUnlockedInstallation = (
    installationID: ApiInstallation['_id']
  ) => {
    const index = this.unlockedInstallations.indexOf(installationID!, 0)

    if (index > -1) {
      this.unlockedInstallations.splice(index, 1)
    }
  }

  @action public isInstallationInLocalStorage = (
    installationID?: ApiInstallation['_id']
  ): boolean => {
    let is = false

    const storageUnlockedInstallations = localStorage.getItem(
      'unlockedInstallations'
    )

    if (storageUnlockedInstallations) {
      JSON.parse(storageUnlockedInstallations).forEach((id: string) => {
        if (id === installationID) {
          is = true
          return
        } else {
          is = false
        }
      })
    }

    return is
  }

  @action public isInstallationUnlocked = (
    installationID?: ApiInstallation['_id']
  ): boolean => {
    let isUnlocked = false

    this.unlockedInstallations.forEach(id => {
      if (id === installationID) {
        isUnlocked = true
        return
      } else {
        isUnlocked = false
      }
    })

    return isUnlocked
  }

  @action public getInstallationBySlug = (
    installationSlug: ApiInstallation['slug']
  ): ApiInstallation => {
    let installationToReturn = {
      _id: '',
    }

    this.installationList.forEach(installation => {
      if (installation.slug === installationSlug) {
        installationToReturn = installation
      }
    })

    return installationToReturn
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
