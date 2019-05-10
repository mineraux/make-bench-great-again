//@ts-ignore
import ScrollMagic from 'scrollmagic'
import { TweenMax, TimelineMax } from 'gsap'
// import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'

class ScrollMagicController {
  public initController = () => {
    const controller = new ScrollMagic.Controller()

    const tween = TweenMax.to('#target', 0.5, { css: { scaleX: 2, scaleY: 1 } })

    // build scene
    const scene = new ScrollMagic.Scene({
      triggerElement: '#trigger',
      duration: 300,
    })
      .setTween(tween)
      .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
  }

  // $("#tweenparams input").on("change", function () {
  //   var params = {css: {
  //     scaleX: parseFloat($("input#scaleX").val()),
  //     scaleY: parseFloat($("input#scaleY").val())
  //   }};
  //   // reset progress to start so changes do not occur from current position but from start
  //   tween.progress(0)
  //   // set set new tween parameters
  //   tween.updateTo(params, true);
  //   // re-add tween to reset position and to update
  //   scene.setTween(tween);
  // });
}

export default new ScrollMagicController()
