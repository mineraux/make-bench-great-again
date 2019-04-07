export interface ApiBench {
  name: string,
  description: string,
  lockedDescription: string,
  geoLocation: [number]
}

export type ApiBenchReponseRoot =  Array<ApiBench>