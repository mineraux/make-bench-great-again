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
    const {
      setScrollProgression,
      setIsScrollIndicationVisible,
      setIsScrollIndicationTextVisible,
    } = NavigationStore

    const controller = new ScrollMagic.Controller()

    // TWEENS

    // Presentation : sketch

    const tweenInstallationSketch = new TimelineMax().fromTo(
      '.page-installation--locked__wrapper__part--first-part__presentation__installation-sketch',
      1,
      {
        scale: 1.4,
        yPercent: 20,
      },
      {
        scale: 1,
        yPercent: 0,
        force3D: true,
        ease: Power1.easeInOut,
      }
    )

    // Presentation : description + title

    const tweenPresentationDescription = new TimelineMax().fromTo(
      '.page-installation--locked__wrapper__part--first-part__presentation__description',
      1,
      {
        opacity: 0,
        y: 30,
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0)',
        autoRound: false,
        force3D: true,
        ease: Power1.easeInOut,
      }
    )

    // SCENES

    // Presentation : sketch

    const scenePart1InstallationSketchDuration = 350
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

    // Presentation : description

    const scenePart1PresentationDescriptionDuration = 350
    const scenePart1PresentationDescriptionOffset =
      scenePart1InstallationSketch.scrollOffset() +
      scenePart1InstallationSketch.duration() -
      250
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

    scenePart1PresentationDescription.on('start', (event: any) => {
      if (event.scrollDirection === 'FORWARD') {
        NavigationStore.setIsScrollIndicationTextVisible(false)
      }
      if (event.scrollDirection === 'REVERSE') {
        NavigationStore.setIsScrollIndicationTextVisible(true)
      }
    })

    // Part 1 : pin

    const scenePart1PinDuration =
      scenePart1PresentationDescription.scrollOffset() +
      scenePart1PresentationDescription.duration() +
      50

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

    // scene page

    const scenePage = new ScrollMagic.Scene({
      duration: scenePart1PinDuration - 1,
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

    scenePage.on('end', (event: any) => {
      if (event.scrollDirection === 'FORWARD') {
        blur.play()
        NavigationStore.setIsScrollIndicationVisible(false)
      } else if (event.scrollDirection === 'REVERSE') {
        blur.reverse()
        NavigationStore.setIsScrollIndicationVisible(true)
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
