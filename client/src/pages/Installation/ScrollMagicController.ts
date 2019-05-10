import { TweenMax, TimelineMax } from 'gsap'
//@ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'

class ScrollMagicController {
  public initController = () => {
    const controller = new ScrollMagic.Controller()

    const tween = TweenMax.to('#target', 0.5, {
      yPercent: -100,
    })

    const textHeight = document
      .querySelector('#target')!
      .getBoundingClientRect().height
    const pageHeight = document
      .querySelector('.page-installation')!
      .getBoundingClientRect().height
    const scene = new ScrollMagic.Scene({
      duration: 2000,
      triggerHook: 0,
    })
      .setTween(tween)
      .setPin('#part1')
      .addIndicators({ name: 'Start animation' })
      .addTo(controller)

    scene.on('progress', (event: any) => {
      console.log('Scene progress changed to' + event.progress)
    })
  }
}

export default new ScrollMagicController()
