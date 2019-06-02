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

    /**
     * PART 1
     */

    // TWEENS
    const tweenPresentationText = new TimelineMax().fromTo(
      '.page-installation__wrapper__part--first-part__presentation__text-content-wrapper__text-content',
      0.5,
      {
        yPercent: 100,
      },
      {
        yPercent: -100,
      }
    )

    const tweenPresentationFade = new TimelineMax().to(
      '.page-installation__wrapper__part--first-part__presentation',
      0.5,
      {
        opacity: 0,
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
    const part1Height = 2700
    const scenePart1Pin = new ScrollMagic.Scene({
      duration: part1Height,
      triggerHook: 0,
    })
      .setPin('.page-installation__wrapper__part--first-part')
      // .addIndicators({ name: 'Pin' })
      .addTo(controller)
    this.scenes.push(scenePart1Pin)

    const scenePresentationText = new ScrollMagic.Scene({
      duration: 1000,
      triggerHook: 0,
    })
      .setTween(tweenPresentationText)
      // .addIndicators({ name: 'Animation presentation translate text' })
      .addTo(controller)
    this.scenes.push(scenePresentationText)

    scenePresentationText.on('progress', (event: any) => {
      setScrollProgressFirstPart(event.progress)
    })

    const scenePresentationFade = new ScrollMagic.Scene({
      duration: 500,
      offset: 1000,
      triggerHook: 0,
    })
      .setTween(tweenPresentationFade)
      // .addIndicators({ name: 'Animation presentation fade' })
      .addTo(controller)
    this.scenes.push(scenePresentationFade)

    const sceneTestimony = new ScrollMagic.Scene({
      duration: 400,
      triggerHook: 0,
      offset: 1500,
    })
      .setTween(tweenTestimony)
      // .addIndicators({ name: 'Animation testimony' })
      .addTo(controller)

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