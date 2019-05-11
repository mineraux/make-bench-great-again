import { TweenMax, TimelineMax } from 'gsap'
//@ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'

class ScrollMagicController {
  public initController = () => {
    const controller = new ScrollMagic.Controller()

    const tweenPresentationText = new TimelineMax().to(
      '.page-installation__presentation__text-content',
      0.5,
      {
        yPercent: -100,
      }
    )

    const tweenPresentationFade = new TimelineMax().to(
      '.page-installation__presentation',
      0.5,
      {
        opacity: 0,
      }
    )

    const tweenTestimony = new TimelineMax().to(
      '.page-installation__testimony',
      0.5,
      {
        opacity: 1,
      }
    )

    const tweenTestimonyText = new TimelineMax().to(
      '.page-installation__testimony__text-content-wrapper',
      0.5,
      {
        opacity: 1,
      }
    )

    const scenePart1Pin = new ScrollMagic.Scene({
      duration: 3000,
      triggerHook: 0,
    })
      .setPin('.part1')
      .addIndicators({ name: 'Pin' })
      .addTo(controller)

    const scenePresentationText = new ScrollMagic.Scene({
      duration: 1500,
      triggerHook: 0,
    })
      .setTween(tweenPresentationText)
      .addIndicators({ name: 'Animation presentation translate text' })
      .addTo(controller)

    const scenePresentationFade = new ScrollMagic.Scene({
      duration: 500,
      offset: 1000,
      triggerHook: 0,
    })
      .setTween(tweenPresentationFade)
      .addIndicators({ name: 'Animation presentation fade' })
      .addTo(controller)

    const sceneTestimony = new ScrollMagic.Scene({
      duration: 400,
      triggerHook: 0,
      offset: 1500,
    })
      .setTween(tweenTestimony)
      .addIndicators({ name: 'Animation testimony' })
      .addTo(controller)

    const sceneTestimonyText = new ScrollMagic.Scene({
      duration: 100,
      triggerHook: 0,
      offset: 1500,
    })
      .setTween(tweenTestimonyText)
      .addIndicators({ name: 'Animation testimony text' })
      .addTo(controller)
  }
}

export default new ScrollMagicController()
