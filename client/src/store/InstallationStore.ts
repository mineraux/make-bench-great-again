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

  // TODO : required ?
  @observable currentInstallationId: string | null = null

  // TODO : required ?
  @action public setCurrentInstallationId = (id: string) => {
    this.currentInstallationId = id
  }

  @action public fetchInstallationList = async (
    fieldToFetch: QueryApiInstallationReponse
  ) => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'production'
    ) {
      this.installationList = [
        {
          _id: '1',
          slug: 'vague',
          name: 'La Vague',
          lockedName: 'Lisbonne',
          caption: 'La Vague, acier et fonte, H. : 75cm L. : 180cm, 2015',
          description:
            'Connu sous le pseudonyme d’Area, ce street artiste originaire de Toulouse nous offre une sculpture longiligne dont la forme ondulatoire aspire à la rêverie. Depuis 2015 des reproductions déferlent aux abords des parcs venant ponctuer les promenades estivales des Parisiens. Au travers de cette expérience, l’espace public est questionné, quelle est la place de l’Homme face à ces créations ?',
          lockedDescription:
            'De son vrai nom, Lisbonne, ce banc anti-sdf à dossier est devenu la nouvelle référence en matière “de banc de repos”. Après avoir révolutionné le banc public en métal il est aujourd’hui un classique du design anti-sdf. Mobilier dissuasif par excellence car en plus d’être conçu pour repousser les sans-abris, sa forme le rend impraticable auprès des skateurs et street artistes.',
          geolocation: [2.4005, 48.8755],
          hashTags: ['lenversdudecor', 'lisbonne'],
          testimony: {
            fileUrl: 'temoignage_02',
            talkers: [
              {
                id: 1,
                name: 'Anonyme',
                details: 'Passant',
              },
              {
                id: 2,
                name: 'Christian Page',
                details: 'ancien SDF',
              },
            ],
            textContent: [
              {
                text:
                  'J’en veux pas ! J’en veux pas ! Aujourd’hui il n’y a que des problèmes ! Donc plus ils dégagent, mieux c’est.',
                talkerID: 1,
                timecodes: [0, 5],
              },
              {
                text:
                  'Les SDF, tu sais, on nous chasse. C’est pas genre, juste, “ouais tu sais, on veut t’aider ou pas t’aider”. On nous chasse, on ne chasse pas les êtres humains, on chasse que les animaux, ça veut dire qu’ils nous prennent pour des animaux. Les gens s’en rendent pas compte mais dans la rue tu meurs ! Il y a plus d’une personne qui meurt dans la rue tous les jours en France !',
                talkerID: 2,
                timecodes: [5.25, 30],
              },
            ],
          },
          challengeText:
            'Es-tu assez agile pour réussir à t’allonger sur cette installation&nbsp;?',
        },
        {
          _id: '2',
          slug: 'en_suspens',
          name: 'En suspens',
          lockedName: 'Miséricordieux',
          caption:
            'Super banc, Fonte, résine de couleur  “vert papier russe” H. : 150 L. : 70cm, 2016',
          description:
            'Conçue à la fin du XXe siècle, cette structure à la forme avant-gardiste suscite depuis de nombreuses années la curiosité des passants. Disposée sous-terre, cette oeuvre minimaliste interroge notre rapport au temps en nous offrant une halte dans les profondeurs de Paris.',
          lockedDescription:
            "De son vrai nom Appui ischiatique ou Miséricordieux, elle puise ses origines des miséricordes. Ces dernières étaient des aménagements apportés aux stalles pour permettre aux moines de s’appuyer ou de s’asseoir pendant les offices tout en ayant l’air d’être debout. Miséricordieux signifie avoir le cœur sensible au malheur d’autrui (du lat. miseria & cor ~ misère & cœur), ce qui constitue un paradoxe lorsqu'il s’avère que la RATP conçoit ces bancs pour repousser les sans-abri des stations de métro",
          geolocation: [2.408, 48.8744],
          hashTags: ['lenversdudecor', 'enSuspens'],
          testimony: {
            fileUrl: 'temoignage_01',
            talkers: [
              {
                id: 1,
                name: 'Manu',
                details: 'sans abri',
              },
              {
                id: 2,
                name: 'Anonyme',
                details: 'fournisseur de mobilier anti-SDF',
              },
              {
                id: 3,
                name: 'Journaliste',
              },
            ],
            textContent: [
              {
                text:
                  "C’est pas fulgurant, mais ouais petit à petit, on voit que quand même, on ne peut plus s'asseoir devant un magasin, on ne peut plus s’asseoir dans le métro, enfin on peut s’asseoir mais on ne peut pas se coucher par exemple.",
                talkerID: 1,
                timecodes: [0, 6],
              },
              {
                text:
                  'Vous pouvez vous reposer les fesses sans vous asseoir et être prêt à partir dès que votre train ou votre bus arrive.',
                talkerID: 2,
                timecodes: [6.5, 14],
              },
              {
                text: 'Est-ce que ce n’est pas un problème ?',
                talkerID: 3,
                timecodes: [14.5, 15.5],
              },
              {
                text:
                  'Non pas du tout, pour les SDF peut-être mais j’en sais rien !',
                talkerID: 2,
                timecodes: [16, 19],
              },
            ],
          },
          challengeText:
            'As-tu assez d’équilibre pour rester allongé sur l’installation&nbsp;?',
        },
        {
          _id: '3',
          slug: 'exedros',
          name: 'Exedros',
          lockedName: 'Pas pratique',
          caption:
            'Exedros, Fonte, résine de couleur “vert papier russe”, H. : 150 L. : 70cm, 2016',
          description:
            'Conçue par Marc Aurel comme une véritable ode à la nature, sa structure en courbes rappelle la forme délicate et organique des feuillages, ramenant une touche printanière dans la ville. Au cours de cette expérience, L’Exedros questionne la place de la nature dans la ville.',
          lockedDescription:
            'Derrière cette forme conviviale et propice à l’échange, se cache pourtant une volonté de rejeter une partie de la population, empêchant les sans-domicile fixes de s’allonger. Cette assise publique voit le jour boulevard Président Wilson en 2016. Son succès est tel qu’elle s’étendra dans toute la capitale. Inventés par JC. Decaux et Marc Aurel, ces bancs fleurissent au pied des arbres, à proximité des abribus.',
          geolocation: [2.4045, 48.8781],
          hashTags: ['lenversdudecor', 'Exedros'],
          testimony: {
            fileUrl: 'temoignage_03',
            talkers: [
              {
                id: 1,
                name: 'François',
                details: 'sans abri depuis 20 ans',
              },
              {
                id: 2,
                name: 'Anonyme',
                details: 'fournisseur',
              },
            ],
            textContent: [
              {
                text:
                  'Imaginez, vous ne trouvez pas une place pendant la nuit et vous êtes obligé de traîner ici pendant la nuit.',
                talkerID: 1,
                timecodes: [0, 10.5],
              },
              {
                text:
                  'Quelques maires nous ont déjà dit “je veux un banc le moins confortable possible” justement pour éviter les problèmes de SDF ou de gens qui pourraient y passer un peu plus de temps',
                talkerID: 2,
                timecodes: [10.75, 19.5],
              },
              {
                text:
                  'Avant il y avait une certaine… comment on dit… une tolérance, exactement, une certaine tolérance, mais aujourd’hui je ne sais pas où c’est passé mais il n’y en a plus. C’est pas la joie, c’est pas la joie.',
                talkerID: 1,
                timecodes: [19.75, 39],
              },
            ],
          },
          challengeText:
            'Ta souplesse te permet-elle de t’allonger sur cette installation&nbsp;?',
        },
        {
          _id: '4',
          slug: 'raccord',
          name: 'Raccord',
          description:
            'Conçue par Marc Aurel comme une véritable ode à la nature, sa structure en courbes rappelle la forme délicate et organique des feuillages, ramenant une touche printanière dans la ville. Au cours de cette expérience, le Raccord questionne la place de la nature dans la ville.',
          geolocation: [2.403, 48.875],
        },
        {
          _id: '5',
          slug: 'mi-lune',
          name: 'Mi-lune',
          description:
            'Conçue à la fin du XXe siècle, cette structure à la forme avant-gardiste suscite depuis de nombreuses années la curiosité des passants. Disposée sous-terre, cette oeuvre minimaliste interroge notre rapport au temps en nous offrant une halte dans les profondeurs de Paris.',
          geolocation: [2.4045, 48.8719],
        },
        {
          _id: '7',
          slug: 'ligne',
          name: 'La ligne',
          description:
            'Conçue par Marc Aurel comme une véritable ode à la nature, sa structure en courbes rappelle la forme délicate et organique des feuillages, ramenant une touche printanière dans la ville. Au cours de cette expérience, la Ligne questionne la place de la nature dans la ville.',
          geolocation: [2.408, 48.8775],
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

    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'production'
    ) {
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
    this.unlockedInstallations.push(installationID)

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
        if (!this.isInstallationUnlocked(id)) {
          this.addUnlockedInstallation(id)
        }
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
