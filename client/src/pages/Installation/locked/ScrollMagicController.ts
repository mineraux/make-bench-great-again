import { TimelineMax, Power2 } from 'gsap'
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

    const tweenPresentation = new TimelineMax()
      .add('blurPresentation')

      .fromTo(
        '.page-installation--locked__presentation',
        0.5,
        {
          filter: 'blur(0)',
        },
        {
          autoRound: false,
          filter: 'blur(12px)',
          ease: Power2.easeInOut,
        },
        'blurPresentation'
      )
      .fromTo(
        '.page-installation--locked__go-to-installation p',
        0.5,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        'blurPresentation+=0.1'
      )

    const headerHeight = document
      .querySelector('header')!
      .getBoundingClientRect().height
    const durationPart1 = 1000
    const durationPart2 = 1000
    console.log(headerHeight)

    // const scenePart1Pin = new ScrollMagic.Scene({
    //   duration: durationPart1,
    //   triggerHook: 0,
    // })
    //   .setPin('.page-installation--locked__presentation')
    //   .addIndicators({ name: 'Pin' })
    //   .setTween(tweenPresentationText)
    //   .addTo(controller)
    // this.scenes.push(scenePart1Pin)

    // const scenePart2Pin = new ScrollMagic.Scene({
    //   offset: durationPart1,
    //   duration: durationPart1 + durationPart2,
    //   triggerHook: 0,
    // })
    //   .setPin('.page-installation--locked__go-to-installation')
    //   .addIndicators({ name: 'Pin2' })
    //   .setTween(tweenPresentation)
    //   .addTo(controller)
    // this.scenes.push(scenePart2Pin)

    const scenePart1Pin = new ScrollMagic.Scene({
      duration: durationPart1 + durationPart2 + headerHeight,
      triggerHook: 0,
    })
      .setPin('.page-installation--locked__wrapper')
      .addIndicators({ name: 'Pin' })
      .addTo(controller)
    this.scenes.push(scenePart1Pin)

    const scenePresentationText = new ScrollMagic.Scene({
      duration: durationPart1 + headerHeight,
      triggerHook: 0,
    })
      .setTween(tweenPresentationText)
      .addIndicators({ name: 'Pin 2' })
      .addTo(controller)
    this.scenes.push(scenePresentationText)

    const sceneTestimonyTextFade = new ScrollMagic.Scene({
      duration: durationPart2 + headerHeight,
      triggerHook: 0,
      offset: durationPart1,
    })
      .setTween(tweenPresentation)
      .addIndicators({ name: 'Pin 3' })
      .addTo(controller)
    this.scenes.push(sceneTestimonyTextFade)
  }

  public destroyScrollMagicScenes = () => {
    this.scenes.forEach(scene => {
      scene.destroy(true)
    })
  }
}

export default new ScrollMagicController()
