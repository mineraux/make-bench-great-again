import { TimelineMax, TweenMax, Power1, Power2 } from 'gsap'
import { autorun } from 'mobx'
// @ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import { NavigationStore } from '../../../store'

class ScrollMagicController {
  isDebug: boolean
  scenes: ScrollMagic.Scene[]
  sceneTestimonyTextTranslate: any
  scrollProgressFirstPartTestimonyPlayer: number
  isFirstPartPlayerPlaying: boolean

  constructor() {
    this.scenes = []
    this.isDebug = false
    this.scrollProgressFirstPartTestimonyPlayer =
      ScrollMagicStore.scrollProgressFirstPartTestimonyPlayer
    this.isFirstPartPlayerPlaying = ScrollMagicStore.isFirstPartPlayerPlaying

    autorun(() => {
      this.isFirstPartPlayerPlaying = ScrollMagicStore.isFirstPartPlayerPlaying
    })

    autorun(() => {
      this.scrollProgressFirstPartTestimonyPlayer =
        ScrollMagicStore.scrollProgressFirstPartTestimonyPlayer

      if (this.sceneTestimonyTextTranslate) {
        // this.sceneTestimonyTextTranslate.progress(this.scrollProgressFirstPartTestimonyPlayer)
        // const currentProgress = {
        //   progress : this.sceneTestimonyTextTranslate.progress()
        // }
        //
        // TweenMax.to(currentProgress, 0.5, {
        //   progress : this.scrollProgressFirstPartTestimonyPlayer,
        //   onUpdate: () => {
        //     if(this.isFirstPartPlayerPlaying) {
        //       console.log("auto scroll : ", currentProgress.progress);
        //       this.sceneTestimonyTextTranslate.progress(currentProgress.progress)
        //     }
        //   }
        // });

        const scroll = {
          y: window.pageYOffset,
        }

        const newScroll =
          this.sceneTestimonyTextTranslate.scrollOffset() +
          this.scrollProgressFirstPartTestimonyPlayer *
            this.sceneTestimonyTextTranslate.duration()
        TweenMax.to(scroll, 0.3, {
          y: newScroll,
          onUpdate: () => {
            if (this.isFirstPartPlayerPlaying) {
              console.log('auto scroll : ', scroll.y)
              window.scrollTo(0, scroll.y)
            }
          },
        })
      }
    })
  }

  public initController = () => {
    const {
      setScrollProgressFirstPart,
      setScrollProgressFirstPartTestimonyPlayer,
      scrollProgressFirstPartTestimonyPlayer,
    } = ScrollMagicStore
    const { setScrollProgression } = NavigationStore

    const controller = new ScrollMagic.Controller()

    /**
     * PART 1
     */

    // TWEENS

    // Presentation : sketch
    const tweenInstallationSketch = new TimelineMax().fromTo(
      '.page-installation__wrapper__part--first-part__presentation__installation-sketch',
      1,
      {
        scale: 1.7,
        yPercent: 30,
      },
      {
        scale: 1,
        yPercent: 0,
        ease: Power1.easeInOut,
        onUpdate: () => {
          // window.dispatchEvent(new Event('resize'));
        },
      }
    )

    // Presentation : description + title

    const tweenPresentationDescription = new TimelineMax()
      .fromTo(
        '.page-installation__wrapper__part--first-part__presentation__description',
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
      .add('title1BeginOut', '+=0.5')
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
        'title1BeginOut'
      )
      .add('title1FinishOut')
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
        'title1FinishOut-=0.5'
      )
      .to(
        '.page-installation__wrapper__part--first-part__presentation__description',
        1,
        {
          opacity: 0,
          filter: 'blur(4px)',
          autoRound: false,
          ease: Power1.easeInOut,
        },
        'title1FinishOut-=0.5'
      )

    // Presentation : text content
    const tweenPresentationText = new TimelineMax().fromTo(
      '.page-installation__wrapper__part--first-part__presentation__text-content-wrapper__container__text-content',
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

    // Presentation : fade out
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

    // Testimony : fade in
    const tweenTestimony = new TimelineMax().fromTo(
      '.page-installation__wrapper__part--first-part__testimony',
      0.5,
      {
        filter: 'blur(4px)',
        opacity: 0,
      },
      {
        opacity: 1,
        filter: 'blur(0)',
        autoRound: false,
        ease: Power1.easeInOut,
      }
    )

    // Testimony : test fade
    const tweenTestimonyTextFade = new TimelineMax().to(
      '.page-installation__wrapper__part--first-part__testimony__text-content-wrapper',
      0.5,
      {
        opacity: 1,
      }
    )

    // Testimony : text translate
    const tweenTestimonyTextTranslate = new TimelineMax().fromTo(
      '.page-installation__wrapper__part--first-part__testimony__text-content-wrapper__container__text-content',
      0.5,
      {
        transform: `translateY(${20 / 2}rem)`,
        yPercent: 0,
      },
      {
        transform: `translateY(${20 / 2}rem)`,
        yPercent: -100,
      }
    )

    // SCENES

    // Presentation: sketch + title

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

    const scenePart1PresentationTextDuration = 1700
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

    scenePart1PresentationText.on('progress', (event: any) => {
      console.log(event.progress)
      setScrollProgressFirstPart(event.progress)
    })

    // Presentation : fade out

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
      .addTo(controller)
    if (this.isDebug) {
      scenePart1PresentationFade.addIndicators({
        name: 'scenePart1PresentationFade',
      })
    }
    this.scenes.push(scenePart1PresentationFade)

    // Testimony : fade in

    const sceneTestimonyOffset =
      scenePart1PresentationFade.scrollOffset() +
      scenePart1PresentationFade.duration() -
      100
    const sceneTestimony = new ScrollMagic.Scene({
      duration: 500,
      triggerHook: 0,
      offset: sceneTestimonyOffset,
    })
      .setTween(tweenTestimony)
      .addTo(controller)
    if (this.isDebug) {
      sceneTestimony.addIndicators({ name: 'sceneTestimony' })
    }
    this.scenes.push(sceneTestimony)

    sceneTestimony.on('start', (event: any) => {
      const prensentation = document.querySelector(
        '.page-installation__wrapper__part--first-part__presentation'
      )
      const testimony = document.querySelector(
        '.page-installation__wrapper__part--first-part__testimony'
      )
      if (event.scrollDirection === 'FORWARD') {
        prensentation!.classList.add('hidden')
        testimony!.classList.remove('hidden')
      } else if (event.scrollDirection === 'REVERSE') {
        testimony!.classList.add('hidden')
        prensentation!.classList.remove('hidden')
      }
    })

    // TODO
    const sceneTestimonyTextFade = new ScrollMagic.Scene({
      duration: 100,
      triggerHook: 0,
      offset: 1500,
    })
      .setTween(tweenTestimonyTextFade)
      .addTo(controller)
    if (this.isDebug) {
      sceneTestimonyTextFade.addIndicators({
        name: '/////// TODO sceneTestimonyTextFade',
      })
    }
    this.scenes.push(sceneTestimonyTextFade)

    // Testimony : text translate

    const sceneTestimonyTextTranslateOffset =
      sceneTestimony.scrollOffset() + sceneTestimony.duration()
    this.sceneTestimonyTextTranslate = new ScrollMagic.Scene({
      duration: 1000,
      offset: sceneTestimonyTextTranslateOffset,
      triggerHook: 0,
    })
      .setTween(tweenTestimonyTextTranslate)
      .addTo(controller)
    if (this.isDebug) {
      this.sceneTestimonyTextTranslate.addIndicators({
        name: 'sceneTestimonyTextTranslate',
      })
    }
    this.scenes.push(this.sceneTestimonyTextTranslate)

    this.sceneTestimonyTextTranslate.on('progress', (event: any) => {
      if (!this.isFirstPartPlayerPlaying) {
        console.log('manual scroll ', event.progress)
        setScrollProgressFirstPartTestimonyPlayer(event.progress)
      }
    })

    // Part 1 : pin
    const scenePart1PinDuration =
      this.sceneTestimonyTextTranslate.scrollOffset() +
      this.sceneTestimonyTextTranslate.duration()
    const scenePart1Pin = new ScrollMagic.Scene({
      duration: scenePart1PinDuration,
      triggerHook: 0,
    })
      .setPin('.page-installation__wrapper__part--first-part')
      .addTo(controller)
    if (this.isDebug) {
      scenePart1Pin.addIndicators({ name: 'scenePart1Pin' })
    }
    this.scenes.push(scenePart1Pin)

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
      triggerHook: 0.7,
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
      duration: scenePart1PinDuration + part2Height,
      triggerHook: 0,
    }).addTo(controller)
    this.scenes.push(scenePage)

    scenePage.on('progress', (event: any) => {
      setScrollProgression(event.progress)
    })

    const tweenShowChallenge = new TimelineMax({ paused: true })
      .add('showChallenge')
      .fromTo(
        '.page-installation__wrapper__part--second-part__challenge__radial-circle',
        0.5,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        'showChallenge'
      )
      .fromTo(
        [
          '.page-installation__wrapper__part--second-part__challenge__title',
          '.page-installation__wrapper__part--second-part__challenge__text-content',
          '.page-installation__wrapper__part--second-part__challenge__sign-petition-button',
          '.page-installation__wrapper__part--second-part__challenge__help',
        ],
        0.5,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        'showChallange+=0.1'
      )

    scenePart2Pin.on('start', () => {
      tweenShowChallenge.play()
    })
  }

  updateTestimonyPlayerProgress = (progress: number) => {
    if (this.sceneTestimonyTextTranslate) {
      // const currentProgress = {progress : this.sceneTestimonyTextTranslate.progress()}
      // TweenMax.to(currentProgress, 0.5, {
      //   progress,
      //   onUpdate: () => {
      //     this.sceneTestimonyTextTranslate.progress(currentProgress.progress)
      //   }
      // })
      // this.sceneTestimonyTextTranslate.progress(progress);
    }
  }

  public destroyScrollMagicScenes = () => {
    this.scenes.forEach(scene => {
      scene.destroy(true)
    })
  }
}

export default new ScrollMagicController()
