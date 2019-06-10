import { TimelineMax, TweenMax, Power0, Power1, Power2 } from 'gsap'
import { autorun } from 'mobx'
import { NavigationStore } from '../../store'
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
        y: 0,
        filter: 'blur(0)',
      },
      {
        opacity: 0,
        y: -100,
        filter: 'blur(6px)',
        autoRound: false,
        force3D: true,
        // ease: Power1.easeInOut,
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
          y: 100,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0)',
          force3D: true,
          autoRound: false,
          // ease: Power1.easeInOut,
        }
      )

    const scenePart1Duration = 300
    const scenePart1Offset = 0
    const scenePart1 = new ScrollMagic.Scene({
      duration: scenePart1Duration,
      triggerHook: 1,
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

    const scenePart2Duration = 300
    const scenePart2 = new ScrollMagic.Scene({
      duration: scenePart2Duration,
      triggerHook: 1,
      offset: scenePart1.duration() + scenePart1.offset() - 200,
    })
      .setTween(tweenPart2)
      .addTo(controller)
    if (this.isDebug) {
      scenePart2.addIndicators({
        name: 'scenePart2',
      })
    }
    this.scenes.push(scenePart2)

    scenePart2.on('start', (event: any) => {
      console.log(event)
      if (event.scrollDirection === 'FORWARD') {
        NavigationStore.setIsScrollIndicationVisible(false)
      }
      if (event.scrollDirection === 'REVERSE') {
        NavigationStore.setIsScrollIndicationVisible(true)
      }
    })

    // Scene page pin
    const scenePageDuration = scenePart2.duration() + scenePart2.offset()

    const scenePage = new ScrollMagic.Scene({
      duration: scenePageDuration,
      triggerHook: 1,
    })
      .setPin('.page-home__containers-wrapper')
      .addTo(controller)

    if (this.isDebug) {
      scenePage.addIndicators({ name: 'scenePagePin' })
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
