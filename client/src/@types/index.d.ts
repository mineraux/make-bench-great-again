declare global {
  interface Window {
    twttr: any;
  }
}

window.twttr = window.twttr || {};

export interface ApiBench {
  name: string,
  description: string,
  lockedDescription: string,
  geolocation: [number, number]
}

export interface queryApiBench {
  name?: Boolean,
  description?: Boolean,
  lockedDescription?: Boolean,
  geolocation?: Boolean
}

export type ApiBenchReponseRoot =  Array<ApiBench>
export type QueryApiBenchReponse = queryApiBench