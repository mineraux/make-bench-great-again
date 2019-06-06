import { TimelineMax, TweenMax, Power1, Power2 } from 'gsap'
import { autorun } from 'mobx'
// @ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import { NavigationStore } from '../../../store'
import { mapRange } from '../../../utils'

class ScrollMagicController {
  isDebug: boolean
  scenes: ScrollMagic.Scene[]

  constructor() {
    this.scenes = []
    this.isDebug = false
  }

  public initController = () => {
    const { setScrollProgressFirstPart } = ScrollMagicStore
    const { setScrollProgression } = NavigationStore

    const controller = new ScrollMagic.Controller()

    // TWEENS
    // Presentation : sketch
    const tweenInstallationSketch = new TimelineMax().fromTo(
      '.page-installation--locked__wrapper__part--first-part__presentation__installation-sketch',
      1,
      {
        scale: 1.7,
        yPercent: 30,
      },
      {
        scale: 1,
        yPercent: 0,
        ease: Power1.easeInOut,
      }
    )

    // Presentation : description + title
    const tweenPresentationDescription = new TimelineMax().fromTo(
      '.page-installation--locked__wrapper__part--first-part__presentation__description',
      1,
      {
        opacity: 0,
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        filter: 'blur(0)',
        autoRound: false,
        ease: Power1.easeInOut,
      }
    )

    // Presentation : text content
    const tweenPresentationText = new TimelineMax().fromTo(
      '.page-installation--locked__wrapper__part--first-part__presentation__text-content-wrapper__container__text-content',
      0.5,
      {
        transform: 'translateY(20rem)',
        yPercent: 0,
      },
      {
        transform: 'translateY(0)',
        yPercent: -100,
      }
    )

    // SCENES
    const scenePart1InstallationSketchDuration = 600
    const scenePart1InstallationSketchOffset = 0
    const scenePart1InstallationSketch = new ScrollMagic.Scene({
      duration: scenePart1InstallationSketchDuration,
      triggerHook: 0,
      offset: scenePart1InstallationSketchOffset,
    })
      .setTween(tweenInstallationSketch)
      .addTo(controller)
    if (this.isDebug) {
      scenePart1InstallationSketch.addIndicators({
        name: 'scenePart1InstallationSketch',
      })
    }
    this.scenes.push(scenePart1InstallationSketch)

    // Presentation : description + title
    const scenePart1PresentationDescriptionDuration = 800
    const scenePart1PresentationDescriptionOffset =
      scenePart1InstallationSketch.scrollOffset() +
      scenePart1InstallationSketch.duration() -
      350
    const scenePart1PresentationDescription = new ScrollMagic.Scene({
      duration: scenePart1PresentationDescriptionDuration,
      triggerHook: 0,
      offset: scenePart1PresentationDescriptionOffset,
    })
      .setTween(tweenPresentationDescription)
      .addTo(controller)
    if (this.isDebug) {
      scenePart1PresentationDescription.addIndicators({
        name: 'scenePart1PresentationDescription',
      })
    }
    this.scenes.push(scenePart1PresentationDescription)

    // Presentation : text
    const scenePart1PresentationTextDuration = 500
    const scenePart1PresentationTextOffset =
      scenePart1PresentationDescription.scrollOffset() +
      scenePart1PresentationDescription.duration()
    const scenePart1PresentationText = new ScrollMagic.Scene({
      duration: scenePart1PresentationTextDuration,
      triggerHook: 0,
      offset: scenePart1PresentationTextOffset,
    })
      .setTween(tweenPresentationText)
      .addTo(controller)
    if (this.isDebug) {
      scenePart1PresentationText.addIndicators({
        name: 'scenePart1PresentationText',
      })
    }
    this.scenes.push(scenePart1PresentationText)
    // Part 1 : pin
    const scenePart1PinDuration =
      scenePart1PresentationText.scrollOffset() +
      scenePart1PresentationText.duration()

    const scenePart1Pin = new ScrollMagic.Scene({
      duration: scenePart1PinDuration,
      triggerHook: 0,
    })
      .setPin('.page-installation--locked__wrapper__part--first-part')
      .addTo(controller)
    if (this.isDebug) {
      scenePart1Pin.addIndicators({ name: 'scenePart1Pin' })
    }
    this.scenes.push(scenePart1Pin)

    // SCENES
    const scenePage = new ScrollMagic.Scene({
      duration: scenePart1PinDuration,
      triggerHook: 0,
    }).addTo(controller)
    this.scenes.push(scenePage)

    scenePage.on('progress', (event: any) => {
      setScrollProgression(mapRange(event.progress, 0, 1, 0, 0.7))
    })

    const blur = new TimelineMax({ paused: true })
      .add('blurPresentation')
      .fromTo(
        '.page-installation--locked__wrapper__part--first-part__presentation',
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
        '.page-installation--locked__wrapper__part--first-part__go-to-installation',
        0.5,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        'blurPresentation+=0.2'
      )

    scenePart1PresentationDescription.on('end', (event: any) => {
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
