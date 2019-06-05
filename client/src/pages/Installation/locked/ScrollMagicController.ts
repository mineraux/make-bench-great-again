import { TimelineMax, Power2 } from 'gsap'
//@ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import { NavigationStore } from '../../../store'
import { getHeaderHeight } from '../../../utils/hooks'
import { mapRange } from '../../../utils'

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
    const tweenFakeScroll = new TimelineMax().fromTo(
      '.page-installation--locked__presentation__content-wrapper__fake-scroll-wrapper',
      0.5,
      {
        yPercent: 0,
      },
      {
        yPercent: -50,
      }
    )

    const tweenBlurPresentation = new TimelineMax()
      .add('progressAppear')
      .fromTo(
        '.page-installation--locked__presentation__svg',
        0.5,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        'progressAppear'
      )
      .fromTo(
        '.page-installation--locked__presentation__content-wrapper__mask',
        0.5,
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
        'progressAppear-=0.2'
      )

    const headerHeight = getHeaderHeight()
    const durationPart1 = 1000 - headerHeight
    const durationPart2 = 1000 - headerHeight

    const scenePage = new ScrollMagic.Scene({
      duration: durationPart1 + durationPart2,
      triggerHook: 0,
    })
      .setPin('.page-installation--locked__wrapper')
      .addIndicators({ name: 'Pin' })
      .addTo(controller)
    this.scenes.push(scenePage)

    const scenePresentation = new ScrollMagic.Scene({
      duration: durationPart1,
      triggerHook: 0,
    })
      .setTween(tweenFakeScroll)
      .addIndicators({ name: 'Pin 2' })
      .addTo(controller)
    this.scenes.push(scenePresentation)

    const sceneGoToInstallation = new ScrollMagic.Scene({
      duration: durationPart2,
      triggerHook: 0,
      offset: durationPart1 - 100,
    })
      .setTween(tweenBlurPresentation)
      .addIndicators({ name: 'Pin 3' })
      .addTo(controller)
    this.scenes.push(sceneGoToInstallation)

    scenePage.on('progress', (event: any) => {
      const progress = mapRange(event.progress, 0, 1, 0, 0.8)
      setScrollProgression(progress)
    })

    sceneGoToInstallation.on('end', (event: any) => {
      const blur = new TimelineMax({ paused: true })
        .add('blurPresentation')
        .fromTo(
          '.page-installation--locked__presentation',
          0.5,
          {
            filter: 'blur(0)',
          },
          {
            autoRound: false,
            filter: 'blur(8px)',
            ease: Power2.easeInOut,
          },
          'blurPresentation'
        )
        .fromTo(
          '.page-installation--locked__go-to-installation',
          0.5,
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
          'blurPresentation+=0.2'
        )

      if (event.scrollDirection === 'FORWARD') {
        blur.play()
      } else if (event.scrollDirection === 'REVERSE') {
        blur.reverse()
      }
    })
  }

  public destroyScrollMagicScenes = () => {
    this.scenes.forEach(scene => {
      scene.destroy(true)
    })
  }
}

export default new ScrollMagicController()
