import { TweenMax, TimelineMax } from 'gsap'
//@ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'

class ScrollMagicController {
  public initController = () => {
    const controller = new ScrollMagic.Controller()

    const tweenPresentation = new TimelineMax()
      .to(
        '#target',
        0.5,
        {
          yPercent: -100,
        },
        0
      )
      .to(
        '.page-installation__installation-name',
        0.5,
        {
          opacity: 0,
        },
        0
      )

    const tweenTestimony = new TimelineMax().to(
      '.testimony',
      0.5,
      {
        opacity: 1,
      },
      0
    )

    const tweenTestimonyText = new TimelineMax().to(
      '.testimony .page-installation__installation-locked-description',
      0.5,
      {
        opacity: 1,
      },
      0
    )

    const textHeight = document
      .querySelector('#target')!
      .getBoundingClientRect().height

    const pageHeight = document
      .querySelector('.page-installation')!
      .getBoundingClientRect().height

    const scenePart1Pin = new ScrollMagic.Scene({
      duration: 3000,
      triggerHook: 0,
    })
      .setPin('#part1')
      .addIndicators({ name: 'Pin' })
      .addTo(controller)

    const scenePresentation = new ScrollMagic.Scene({
      duration: 1500,
      triggerHook: 0,
    })
      .setTween(tweenPresentation)
      .addIndicators({ name: 'Animation presentation' })
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
