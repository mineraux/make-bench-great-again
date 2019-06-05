import { Hashtag } from 'react-twitter-widgets'

declare global {
  interface Window {
    twttr: any
  }
}

window.twttr = window.twttr || {}

export type Coords = [number, number]

export interface ApiInstallation {
  _id: string
  slug?: string
  name?: string
  lockedName?: string
  description?: string
  lockedDescription?: string
  geolocation?: Coords
  hashTags?: string[]
  testimony?: string
  relatedPetition?: string
  caption?: string

  replace?(arg0: RegExp, arg1: string)
}

export interface queryApiInstallation {
  slug?: boolean
  name?: boolean
  lockedName?: boolean
  description?: boolean
  lockedDescription?: boolean
  geolocation?: boolean
  hashTags?: boolean
  testimony?: boolean
  relatedPetition?: boolean
  caption?: boolean
}

export interface createApiInstallation {
  slug: string
  name: string
  lockedName: string
  description: string
  lockedDescription: string
  latitude: number
  longitude: number
  hashtags: string[]
  testimony: string
  relatedPetition?: string
  caption: string
}

export interface updateApiInstallation extends createApiInstallation {
  _id: string
}

export interface ApiPetition {
  _id: string
  subscribers?: string[]
  relatedInstallation?: string | null
}

export interface createApiPetition {
  subscribers?: string[]
  relatedInstallation?: string | null
}

export type ApiInstallationReponseRoot = ApiInstallation[]
export type ApiSingleInstallationReponseRoot = ApiInstallation
export type QueryApiInstallationReponse = queryApiInstallation
export type createApiInstallationMutation = createApiInstallation
export type updateApiInstallationMutation = updateApiInstallation

export type ApiPetitionReponseRoot = ApiPetition[]
export type ApiSinglePetitionReponseRoot = ApiPetition
export type createApiPetitionMutation = createApiPetition
