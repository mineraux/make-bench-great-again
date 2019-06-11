import { TimelineMax, TweenMax, Power0, Power1, Power2 } from 'gsap'
import { autorun } from 'mobx'
// @ts-ignore
import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import 'debug.addIndicators'
import { ApiInstallation } from '../../../@types'
import ScrollMagicStore from '../../../store/ScrollMagicStore'
import { NavigationStore, InstallationStore } from '../../../store'
import { themes as scrollIndicationThemes } from '../../../components/ScrollIndication/ScrollIndication'
import { themes as mapButtonThemes } from '../../../components/MapButton/MapButton'

class ScrollMagicController {
  isDebug: boolean
  scenes: ScrollMagic.Scene[]
  sceneTestimonyTextTranslate: any
  scrollProgressFirstPartTestimonyPlayer: number
  isFirstPartPlayerPlaying: boolean
  installation: ApiInstallation | null

  constructor() {
    this.scenes = []
    this.isDebug = false
    this.scrollProgressFirstPartTestimonyPlayer =
      ScrollMagicStore.scrollProgressFirstPartTestimonyPlayer
    this.isFirstPartPlayerPlaying = ScrollMagicStore.isFirstPartPlayerPlaying
    this.installation = null

    autorun(() => {
      this.isFirstPartPlayerPlaying = ScrollMagicStore.isFirstPartPlayerPlaying
    })

    autorun(() => {
      this.scrollProgressFirstPartTestimonyPlayer =
        ScrollMagicStore.scrollProgressFirstPartTestimonyPlayer

      if (this.sceneTestimonyTextTranslate) {
        const scroll = {
          y: window.pageYOffset,
        }

        const newScroll =
          this.sceneTestimonyTextTranslate.scrollOffset() +
          this.scrollProgressFirstPartTestimonyPlayer *
            this.sceneTestimonyTextTranslate.duration()

        if (this.isFirstPartPlayerPlaying) {
          TweenMax.to(scroll, 0.5, {
            y: newScroll,
            onUpdate: () => {
              // Auto scroll
              window.scrollTo(0, scroll.y)
            },
          })
        }
      }
    })
  }

  public initController = (installation: ApiInstallation) => {
    this.installation = installation
    const {
      setScrollProgressFirstPart,
      setScrollProgressFirstPartTestimonyPlayer,
      scrollProgressFirstPartTestimonyPlayer,
    } = ScrollMagicStore
    const { setScrollProgression } = NavigationStore

    const controller = new ScrollMagic.Controller()

    /*****
     * PART 1
     *****/

    // TWEENS

    // Presentation : sketch

    const tweenInstallationSketch = new TimelineMax().fromTo(
      '.page-installation__wrapper__part--first-part__presentation__installation-sketch',
      1,
      {
        scale: 1.4,
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

    const presentationTextContentEl = document.querySelector(
      '.page-installation__wrapper__part--first-part__presentation__text-content-wrapper__container__text-content'
    )
    const tweenPresentationText = new TimelineMax()
      .to(
        presentationTextContentEl!,
        10,
        {
          opacity: 1,
          filter: 'blur(0)',
          autoRound: false,
          ease: Power1.easeInOut,
        },
        0
      )
      .fromTo(
        presentationTextContentEl!,
        100,
        {
          transform: 'translateY(10rem)',
          yPercent: 0,
        },
        {
          transform: 'translateY(10rem)',
          yPercent: -100,
        },
        0
      )
      .to(
        presentationTextContentEl!,
        10,
        {
          opacity: 0,
          filter: 'blur(4px)',
          autoRound: false,
          ease: Power1.easeInOut,
        },
        90
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

    // Testimony : talkers

    const tweenTestimonyTalkers = new TimelineMax({ paused: true })

    const fadeDuration = 0.5

    this.installation!.testimony!.textContent.forEach(text => {
      const el = document.querySelector(
        `.page-installation__wrapper__part--first-part__testimony__talkers__talker.talker-${
          text.talkerID
        }`
      )

      tweenTestimonyTalkers.to(
        el!,
        fadeDuration,
        {
          opacity: 1,
          filter: 'blur(0)',
          autoRound: false,
          overwrite: false,
        },
        text.timecodes![0]
      )

      tweenTestimonyTalkers.to(
        el!,
        fadeDuration,
        {
          opacity: 0,
          filter: 'blur(4px)',
          autoRound: false,
          overwrite: false,
        },
        text.timecodes![1]
      )
    })

    tweenTestimonyTalkers.progress(0)

    // Testimony : text translate

    const textContentEl = document.querySelector(
      '.page-installation__wrapper__part--first-part__testimony__text-content-wrapper__container__text-content'
    )

    const tweenTestimonyTextTranslate = new TimelineMax()
      .to(textContentEl!, 10, { opacity: 1, ease: Power1.easeInOut }, 0)
      .fromTo(
        textContentEl!,
        100,
        {
          transform: `translateY(${20 * 0.7}rem)`,
          yPercent: 0,
        },
        {
          transform: `translateY(${20 * 0.3}rem)`,
          yPercent: -100,
          ease: Power0.easeOut,
        },
        0
      )
      .to(
        textContentEl!,
        10,
        {
          opacity: 0,
          ease: Power1.easeInOut,
        },
        90
      )

    // Challenge : challenge fade in / testimony fade out

    const tweenChallenge = new TimelineMax()
      .to('.page-installation__wrapper__part--first-part__testimony', 1, {
        opacity: 0,
        filter: 'blur(15px)',
        autoRound: false,
        ease: Power1.easeInOut,
      })
      .fromTo(
        '.page-installation__wrapper__part--first-part__challenge',
        1,
        {
          opacity: 0,
          filter: 'blur(15px)',
        },
        {
          opacity: 1,
          filter: 'blur(0)',
          autoRound: false,
          ease: Power1.easeInOut,
        },
        '-=0.7'
      )

    // Challenge : cirle animation

    const tweenChallengeCircle = new TimelineMax({ paused: true }).fromTo(
      '.page-installation__wrapper__part--first-part__challenge__wrapper-title__radial-circle',
      2,
      {
        scale: 1,
      },
      {
        scale: 1.2,
        ease: Power2.easeInOut,
        repeat: -1,
        yoyo: true,
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

    scenePart1PresentationDescription.on('start', (event: any) => {
      if (event.scrollDirection === 'FORWARD') {
        NavigationStore.setIsScrollIndicationTextVisible(false)
      }
      if (event.scrollDirection === 'REVERSE') {
        NavigationStore.setIsScrollIndicationTextVisible(true)
      }
    })

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
      tweenTestimonyTalkers.progress(event.progress)
      if (!this.isFirstPartPlayerPlaying) {
        // console.log('manual scroll ', event.progress)
        // Manual scroll
        setScrollProgressFirstPartTestimonyPlayer(event.progress)
      }
    })

    // Challenge fade in / Testimony fade out

    const sceneChallengeOffset =
      this.sceneTestimonyTextTranslate.scrollOffset() +
      this.sceneTestimonyTextTranslate.duration()
    const sceneChallenge = new ScrollMagic.Scene({
      duration: 700,
      offset: sceneChallengeOffset,
      triggerHook: 0,
    })
      .setTween(tweenChallenge)
      .addTo(controller)
    if (this.isDebug) {
      sceneChallenge.addIndicators({
        name: 'sceneChallenge',
      })
    }
    this.scenes.push(sceneChallenge)

    sceneChallenge.on('start', (event: any) => {
      const testimony = document.querySelector(
        '.page-installation__wrapper__part--first-part__testimony'
      )
      const challenge = document.querySelector(
        '.page-installation__wrapper__part--first-part__challenge'
      )
      if (event.scrollDirection === 'FORWARD') {
        testimony!.classList.add('hidden')
        challenge!.classList.remove('hidden')
        tweenChallengeCircle.play()
        NavigationStore.setScrollIndicationTheme(scrollIndicationThemes.Blue)
        NavigationStore.setMapButttonThemes(mapButtonThemes.Blue)
      } else if (event.scrollDirection === 'REVERSE') {
        challenge!.classList.add('hidden')
        testimony!.classList.remove('hidden')
        tweenChallengeCircle.pause()
        NavigationStore.setScrollIndicationTheme(scrollIndicationThemes.Green)
        NavigationStore.setMapButttonThemes(mapButtonThemes.Pink)
      }
    })

    // Part 1 : pin

    const scenePart1PinDuration =
      sceneChallenge.scrollOffset() + sceneChallenge.duration()
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

    scenePart1Pin.on('end', (event: any) => {
      if (event.scrollDirection === 'FORWARD') {
        NavigationStore.setIsScrollIndicationVisible(false)
        ScrollMagicStore.setIsTwitterLiveReload(true)
        NavigationStore.setMapButttonThemes(mapButtonThemes.Pink)
      }
      if (event.scrollDirection === 'REVERSE') {
        NavigationStore.setIsScrollIndicationVisible(true)
        ScrollMagicStore.setIsTwitterLiveReload(false)
        NavigationStore.setMapButttonThemes(mapButtonThemes.Blue)
      }
    })

    // ALL PAGE

    const thirdPart = document.querySelector(
      '.page-installation__wrapper__part--third-part'
    )

    const scenePage = new ScrollMagic.Scene({
      duration: scenePart1PinDuration + thirdPart!.clientHeight,
      triggerHook: 0,
    }).addTo(controller)
    if (this.isDebug) {
      scenePage.addIndicators({ name: 'scenePage' })
    }
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
