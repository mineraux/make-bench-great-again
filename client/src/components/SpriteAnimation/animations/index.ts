import bancMetro from './banc-metro.png'

export enum animationId {
  bancMetro = 'banc-metro',
}
// const animationID:
interface animationtype {
  image: any
  widthFrame: number
  heightFrame: number
  steps: number
  fps: number
  loop: boolean
}

const animations: { [k: string]: animationtype } = {
  [animationId.bancMetro]: {
    image: bancMetro,
    widthFrame: 750,
    heightFrame: 671,
    steps: 76,
    fps: 25,
    loop: true,
  },
}

export default animations
