import bancMetro from './banc-metro.png'
import en_suspens from './en_suspens.png'
import vague from './vague.png'
import exedros from './exedros.png'

export enum animationId {
  bancMetro = 'banc-metro',
  en_suspens = 'en_suspens',
  vague = 'vague',
  exedros = 'exedros',
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
  [animationId.en_suspens]: {
    image: en_suspens,
    widthFrame: 640,
    heightFrame: 573,
    steps: 126,
    fps: 25,
    loop: true,
  },
  [animationId.vague]: {
    image: vague,
    widthFrame: 640,
    heightFrame: 573,
    steps: 125,
    fps: 25,
    loop: true,
  },
  [animationId.exedros]: {
    image: exedros,
    widthFrame: 640,
    heightFrame: 573,
    steps: 126,
    fps: 25,
    loop: true,
  },
}

export default animations
