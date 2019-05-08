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
  name?: string
  description?: string
  lockedDescription?: string
  geolocation?: Coords
  hashTags?: string[]
  testimony?: string
  relatedPetition?: string

  replace?(arg0: RegExp, arg1: string)
}

export interface queryApiInstallation {
  name?: boolean
  description?: boolean
  lockedDescription?: boolean
  geolocation?: boolean
  hashTags?: string[]
  testimony?: string
  relatedPetition?: string
}

export interface createApiInstallation {
  name: string
  description: string
  lockedDescription: string
  latitude: number
  longitude: number
  hashtags: string[]
  testimony: string
  relatedPetition?: string
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
