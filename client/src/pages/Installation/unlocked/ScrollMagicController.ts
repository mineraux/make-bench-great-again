import { TimelineMax, Power1, Power2 } from 'gsap'
// @ts-ignore
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

    /**
     * PART 1
     */

    // DOM

    const sketchEl = document.querySelector(
      '.page-installation__wrapper__part--first-part__presentation__installation-sketch'
    )

    // TWEENS

    // sketch + titles
    const tweenInstallationSketch = new TimelineMax()
      .fromTo(
        sketchEl!,
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
      .fromTo(
        '.page-installation__wrapper__part--first-part__presentation__title.title1',
        1,
        {
          filter: 'blur(0)',
        },
        {
          opacity: 0,
          filter: 'blur(4px)',
          autoRound: false,
          ease: Power1.easeInOut,
        },
        '-=0.5'
      )
      .fromTo(
        '.page-installation__wrapper__part--first-part__presentation__title.title2',
        1,
        {
          filter: 'blur(4px)',
          opacity: 0,
        },
        {
          opacity: 1,
          filter: 'blur(0)',
          autoRound: false,
          ease: Power1.easeInOut,
        },
        '-=0.2'
      )

    // text
    const tweenPresentationText = new TimelineMax().fromTo(
      '.page-installation__wrapper__part--first-part__presentation__text-content-wrapper__container__text-content',
      0.5,
      {
        transform: 'translateY(25rem)',
        yPercent: 0,
      },
      {
        transform: 'translateY(0)',
        yPercent: -100,
      }
    )

    const tweenPresentationFade = new TimelineMax().fromTo(
      '.page-installation__wrapper__part--first-part__presentation',
      0.5,
      {
        opacity: 1,
        filter: 'blur(0)',
      },
      {
        opacity: 0,
        filter: 'blur(4px)',
        autoRound: false,
        ease: Power1.easeInOut,
      }
    )

    const tweenTestimonyTextTranslate = new TimelineMax().fromTo(
      '.page-installation__wrapper__part--first-part__testimony__text-content-wrapper__text-content',
      0.5,
      {
        yPercent: 100,
      },
      {
        yPercent: -100,
      }
    )

    /**
     * Tweens de témoignage de l'oeuvre
     */
    const tweenTestimony = new TimelineMax().to(
      '.page-installation__wrapper__part--first-part__testimony',
      0.5,
      {
        opacity: 1,
      }
    )

    const tweenTestimonyTextFade = new TimelineMax().to(
      '.page-installation__wrapper__part--first-part__testimony__text-content-wrapper',
      0.5,
      {
        opacity: 1,
      }
    )

    // SCENES

    // Part 1 : pin
    const part1Height = 2700
    const scenePart1Pin = new ScrollMagic.Scene({
      duration: part1Height,
      triggerHook: 0,
    })
      .setPin('.page-installation__wrapper__part--first-part')
      .addTo(controller)
      .addIndicators({ name: 'scenePart1Pin' })
    this.scenes.push(scenePart1Pin)

    // Part 1 : installation sketch
    const scenePart1InstallationSketchDuration = 600
    const scenePart1InstallationSketchOffset = 0
    const scenePart1InstallationSketch = new ScrollMagic.Scene({
      duration: scenePart1InstallationSketchDuration,
      triggerHook: 0,
      offset: scenePart1InstallationSketchOffset,
    })
      .setTween(tweenInstallationSketch)
      .addTo(controller)
      .addIndicators({ name: 'scenePart1InstallationSketch' })
    this.scenes.push(scenePart1InstallationSketch)

    // Part 1 : presentation text
    const scenePart1PresentationTextDuration = 1700
    const scenePart1PresentationTextOffset =
      scenePart1InstallationSketch.scrollOffset() +
      scenePart1InstallationSketch.duration() -
      150
    const scenePart1PresentationText = new ScrollMagic.Scene({
      duration: scenePart1PresentationTextDuration,
      triggerHook: 0,
      offset: scenePart1PresentationTextOffset,
    })
      .setTween(tweenPresentationText)
      .addTo(controller)
      .addIndicators({ name: 'scenePart1PresentationText' })
    this.scenes.push(scenePart1PresentationText)

    scenePart1PresentationText.on('progress', (event: any) => {
      console.log(event.progress)
      setScrollProgressFirstPart(event.progress)
    })

    const scenePresentationFadeOffset =
      scenePart1PresentationText.scrollOffset() +
      scenePart1PresentationText.duration() -
      300
    const scenePart1PresentationFade = new ScrollMagic.Scene({
      duration: 500,
      offset: scenePresentationFadeOffset,
      triggerHook: 0,
    })
      .setTween(tweenPresentationFade)
      .addIndicators({ name: 'scenePart1PresentationFade' })
      .addTo(controller)
    this.scenes.push(scenePart1PresentationFade)

    const sceneTestimonyOffset =
      scenePart1PresentationFade.scrollOffset() +
      scenePart1PresentationFade.duration() -
      100
    const sceneTestimony = new ScrollMagic.Scene({
      duration: 400,
      triggerHook: 0,
      offset: sceneTestimonyOffset,
    })
      .setTween(tweenTestimony)
      .addIndicators({ name: 'Animation testimony' })
      .addTo(controller)
    this.scenes.push(sceneTestimony)

    const sceneTestimonyTextFade = new ScrollMagic.Scene({
      duration: 100,
      triggerHook: 0,
      offset: 1500,
    })
      .setTween(tweenTestimonyTextFade)
      // .addIndicators({ name: 'Animation testimony text' })
      .addTo(controller)
    this.scenes.push(sceneTestimonyTextFade)

    const sceneTestimonyTextTranslate = new ScrollMagic.Scene({
      duration: 1000,
      offset: 1700,
      triggerHook: 0,
    })
      .setTween(tweenTestimonyTextTranslate)
      // .addIndicators({ name: 'Animation testimony translate text' })
      .addTo(controller)
    this.scenes.push(sceneTestimonyTextTranslate)
    /**
     * PART 2
     */

    // TWEENS
    const tweenMapButtonColor = new TimelineMax()
      .to(
        '.map-button',
        3,
        {
          css: { className: 'map-button theme-blue' },
        },
        0
      )

      .to(
        '.map-button__marker path',
        3,
        {
          css: { className: 'theme-pink' },
        },
        0
      )

    // SCENES
    const scenePart2Pin = new ScrollMagic.Scene({
      triggerElement: '.page-installation__wrapper__part--second-part',
      duration: 1,
      triggerHook: 0,
    })
      .setPin('.page-installation__wrapper__part--second-part')
      // .addIndicators({ name: 'Pin 2' })
      .addTo(controller)
    this.scenes.push(scenePart2Pin)

    const part2Height = document
      .querySelector('.page-installation__wrapper__part--second-part')!
      .getBoundingClientRect().height

    const transitionMapButtonColor = new ScrollMagic.Scene({
      triggerElement: '.page-installation__wrapper__part--second-part',
      duration: part2Height,
      triggerHook: 1,
    })
      .setTween(tweenMapButtonColor)
      // .addIndicators({ name: 'Transition Map button color' })
      .addTo(controller)
    this.scenes.push(transitionMapButtonColor)

    const scenePage = new ScrollMagic.Scene({
      duration: part1Height + part2Height,
      triggerHook: 0,
    }).addTo(controller)
    this.scenes.push(scenePage)

    scenePage.on('progress', (event: any) => {
      setScrollProgression(event.progress)
    })
  }

  public destroyScrollMagicScenes = () => {
    this.scenes.forEach(scene => {
      scene.destroy(true)
    })
  }
}

export default new ScrollMagicController()
