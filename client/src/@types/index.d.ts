export type Coords = [number,number]

export interface ApiBench {
  name?: string,
  description?: string,
  lockedDescription?: string,
  geolocation?: Coords
}

export interface ApiBenchTemp {
  id?: number,
  name?: string,
  description?: string,
  lockedDescription?: string,
  geolocation?: Coords
}

export interface queryApiBench {
  name?: Boolean,
  description?: Boolean,
  lockedDescription?: Boolean,
  geolocation?: Boolean
}

export type ApiBenchReponseRoot =  Array<ApiBench>
export type ApiBenchReponseRootTemp =  Array<ApiBenchTemp>
export type QueryApiBenchReponse = queryApiBench