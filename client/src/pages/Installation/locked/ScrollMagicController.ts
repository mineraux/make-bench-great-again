import { TimelineMax } from 'gsap'
//@ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import { NavigationStore } from '../../../store'

class ScrollMagicController {
  scenes: ScrollMagic.Scene[]

  constructor() {
    this.scenes = []
  }

  public initController = () => {
    const { setScrollProgressFirstPart } = ScrollMagicStore
    const { setScrollProgression } = NavigationStore

    const controller = new ScrollMagic.Controller()

    // TWEENS
    const tweenPresentationText = new TimelineMax().fromTo(
      '.test',
      0.5,
      {
        yPercent: 0,
      },
      {
        yPercent: -50,
      }
    )

    const tweenPresentation = new TimelineMax().fromTo(
      '.page-installation--locked__go-to-installation p',
      0.5,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    )

    const scenePart1Pin = new ScrollMagic.Scene({
      duration: 1000,
      triggerHook: 0,
    })
      .setPin('.page-installation--locked__presentation')
      .addIndicators({ name: 'Pin' })
      .setTween(tweenPresentationText)
      .addTo(controller)
    this.scenes.push(scenePart1Pin)

    const scenePart2Pin = new ScrollMagic.Scene({
      offset: 1340,
      duration: 694.5,
      triggerHook: 1,
    })
      .setPin('.page-installation--locked__go-to-installation')
      .addIndicators({ name: 'Pin2' })
      .setTween(tweenPresentation)
      .addTo(controller)
    this.scenes.push(scenePart2Pin)

    // SCENES
    //const part1Height = 1000
    // const scenePart1Pin = new ScrollMagic.Scene({
    //   duration: part1Height,
    //   triggerHook: 0,
    // })
    //   // .setPin('.page-installation--locked')
    //   // .addIndicators({ name: 'Pin' })
    //   .setTween(tweenPresentationText)
    //   .addTo(controller)
    // this.scenes.push(scenePart1Pin)

    // scenePage.on('progress', (event: any) => {
    //   setScrollProgression(event.progress)
    // })
  }

  public destroyScrollMagicScenes = () => {
    this.scenes.forEach(scene => {
      scene.destroy(true)
    })
  }
}

export default new ScrollMagicController()
