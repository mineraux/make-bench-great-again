import { Hashtag } from 'react-twitter-widgets'

declare global {
  interface Window {
    twttr: any
  }
}

window.twttr = window.twttr || {}

export type Coords = [number, number]

export interface ApiBench {
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

export interface queryApiBench {
  name?: Boolean
  description?: Boolean
  lockedDescription?: Boolean
  geolocation?: Boolean
  hashTags?: string[]
  testimony?: string
  relatedPetition?: string
}

export interface createApiBench {
  name: string
  description: string
  lockedDescription: string
  latitude: number
  longitude: number
  hashtags: string[]
  testimony: string
  relatedPetition?: string
}

export interface updateApiBench extends createApiBench {
  _id: string
}

export type ApiBenchReponseRoot = Array<ApiBench>
export type ApiSingleBenchReponseRoot = ApiBench
export type QueryApiBenchReponse = queryApiBench
export type createApiBenchMutation = createApiBench
export type updateApiBenchMutation = updateApiBench
