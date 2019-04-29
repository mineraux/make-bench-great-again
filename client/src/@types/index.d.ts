declare global {
  interface Window {
    twttr: any;
  }
}

window.twttr = window.twttr || {};

export type Coords = [number,number]


export interface ApiBench {
  _id: string,
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
export type ApiSingleBenchReponseRoot = ApiBench
export type QueryApiBenchReponse = queryApiBench