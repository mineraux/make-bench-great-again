export interface ApiBench {
  name: string,
  description: string,
  lockedDescription: string,
  geoLocation: [number, number]
}

export interface queryApiBench {
  name?: Boolean,
  description?: Boolean,
  lockedDescription?: Boolean,
  geoLocation?: Boolean
}

export type ApiBenchReponseRoot =  Array<ApiBench>
export type QueryApiBenchReponse = queryApiBench