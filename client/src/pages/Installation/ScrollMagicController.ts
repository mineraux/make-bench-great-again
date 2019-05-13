import { TweenMax, TimelineMax } from 'gsap'
//@ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'
import { Timeline } from 'react-twitter-widgets'

class ScrollMagicController {
  public initController = () => {
    const controller = new ScrollMagic.Controller()

    const scenePart1Pin = new ScrollMagic.Scene({
      duration: 2700,
      triggerHook: 0,
    })
      .setPin('.page-installation__part1')
      .addIndicators({ name: 'Pin' })
      .addTo(controller)

    /**
     * Tweens de présentation de l'installation
     */
    const tweenPresentationText = new TimelineMax().to(
      '.page-installation__presentation__text-content',
      0.5,
      {
        yPercent: -100,
      }
    )

    const scenePresentationText = new ScrollMagic.Scene({
      duration: 1000,
      triggerHook: 0,
    })
      .setTween(tweenPresentationText)
      .addIndicators({ name: 'Animation presentation translate text' })
      .addTo(controller)

    const tweenPresentationFade = new TimelineMax().to(
      '.page-installation__presentation',
      0.5,
      {
        opacity: 0,
      }
    )

    const scenePresentationFade = new ScrollMagic.Scene({
      duration: 500,
      offset: 1000,
      triggerHook: 0,
    })
      .setTween(tweenPresentationFade)
      .addIndicators({ name: 'Animation presentation fade' })
      .addTo(controller)

    /**
     * Tweens de témoignage de l'oeuvre
     */

    const tweenTestimony = new TimelineMax().to(
      '.page-installation__testimony',
      0.5,
      {
        opacity: 1,
      }
    )

    const sceneTestimony = new ScrollMagic.Scene({
      duration: 400,
      triggerHook: 0,
      offset: 1500,
    })
      .setTween(tweenTestimony)
      .addIndicators({ name: 'Animation testimony' })
      .addTo(controller)

    const tweenTestimonyTextFade = new TimelineMax().to(
      '.page-installation__testimony__text-content-wrapper',
      0.5,
      {
        opacity: 1,
      }
    )

    const sceneTestimonyTextFade = new ScrollMagic.Scene({
      duration: 100,
      triggerHook: 0,
      offset: 1500,
    })
      .setTween(tweenTestimonyTextFade)
      .addIndicators({ name: 'Animation testimony text' })
      .addTo(controller)

    const tweenTestimonyTextTranslate = new TimelineMax().to(
      '.page-installation__testimony__text-content',
      0.5,
      {
        yPercent: -100,
      }
    )

    const sceneTestimonyTextTranslate = new ScrollMagic.Scene({
      duration: 1000,
      offset: 1700,
      triggerHook: 0,
    })
      .setTween(tweenTestimonyTextTranslate)
      .addIndicators({ name: 'Animation testimony translate text' })
      .addTo(controller)

    const scenePart2Pin = new ScrollMagic.Scene({
      triggerElement: '.page-installation__part2',
      duration: 1,
      triggerHook: 0,
    })
      .setPin('.page-installation__part2')
      .addIndicators({ name: 'Pin 2' })
      .addTo(controller)

    const part2Height = document
      .querySelector('.page-installation__part2')!
      .getBoundingClientRect().height

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

    const transitionMapButtonColor = new ScrollMagic.Scene({
      triggerElement: '.page-installation__part2',
      duration: part2Height,
      triggerHook: 1,
    })

      .setTween(tweenMapButtonColor)
      .addIndicators({ name: 'Transition Map button color' })
      .addTo(controller)
  }
}

export default new ScrollMagicController()
