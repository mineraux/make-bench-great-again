import { TimelineMax, TweenMax, Power0, Power1, Power2 } from 'gsap'
import { autorun } from 'mobx'
// @ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'

class ScrollMagicController {
  isDebug: boolean
  scenes: ScrollMagic.Scene[]

  constructor() {
    this.scenes = []
    this.isDebug = false
  }

  public initController = () => {
    const controller = new ScrollMagic.Controller()

    const tweenPart1 = new TimelineMax().fromTo(
      '.page-home__containers-wrapper__container-1',
      1,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        ease: Power1.easeInOut,
      }
    )

    const tweenPart2 = new TimelineMax()
      .set('.page-home__containers-wrapper__container-2', {
        pointerEvents: 'initial',
      })
      .fromTo(
        '.page-home__containers-wrapper__container-2',
        1,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          ease: Power1.easeInOut,
        }
      )

    const scenePart1Duration = 600
    const scenePart1Offset = 0
    const scenePart1 = new ScrollMagic.Scene({
      duration: scenePart1Duration,
      triggerHook: 0,
      offset: scenePart1Offset,
    })
      .setTween(tweenPart1)
      .addTo(controller)
    if (this.isDebug) {
      scenePart1.addIndicators({
        name: 'scenePart1',
      })
    }
    this.scenes.push(scenePart1)

    const scenePart2Duration = 600
    const scenePart2 = new ScrollMagic.Scene({
      duration: scenePart2Duration,
      triggerHook: 0,
      offset: scenePart1.duration() - 100,
    })
      .setTween(tweenPart2)
      .addTo(controller)
    if (this.isDebug) {
      scenePart2.addIndicators({
        name: 'scenePart2',
      })
    }
    this.scenes.push(scenePart2)
    // Scene page pin
    const scenePageDuration =
      scenePart1.duration() + scenePart2.duration() + scenePart2.offset()
    const scenePage = new ScrollMagic.Scene({
      duration: scenePageDuration,
      triggerHook: 0,
    })
      .setPin('.page-home__containers-wrapper')
      .addTo(controller)

    if (this.isDebug) {
      scenePage.addIndicators({ name: 'scenePart1Pin' })
    }
    this.scenes.push(scenePage)
  }

  public destroyScrollMagicScenes = () => {
    this.scenes.forEach(scene => {
      scene.destroy(true)
    })
  }
}

export default new ScrollMagicController()
