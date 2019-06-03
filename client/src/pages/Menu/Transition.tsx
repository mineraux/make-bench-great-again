import React, { FunctionComponent, ReactNode } from 'react'
import { Transition } from 'react-transition-group'
import { TimelineMax, TweenMax, Sine, Power1, Power2, Power3 } from 'gsap'
import { NavigationStore } from '../../store'
import { observer } from 'mobx-react-lite'
import { pageTransitionProps } from '../types'
import Menu from './Menu'

type Props = pageTransitionProps

const TransitionComponent: FunctionComponent<Props> = ({ show }) => {
  const {
    setCurrentPagePath,
    nextPagePath,
    setIsMapButtonMenu,
  } = NavigationStore

  // Enter : start
  const onEnter = (node: HTMLElement): void => {
    TweenMax.set(node, {
      opacity: 0,
      filter: 'blur(15px)',
    })
  }

  // Enter : transition
  const onEnterTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    const top = node.querySelector('.page-menu__top')
    const topRound = node.querySelector('.page-menu__top__round')
    const topRoundTextLetters = node.querySelectorAll(
      '.page-menu__top__round__text span'
    )
    const bottomTextLetters = node.querySelectorAll(
      '.page-menu__bottom__text span'
    )
    const mapButton = document.querySelectorAll('.map-button')
    const mapButtonText = document.querySelectorAll('.map-button__menu-text')
    const mapButtonTextLetters = document.querySelectorAll(
      '.map-button__menu-text span'
    )

    tl.add(() => {
      setIsMapButtonMenu(true)
    }, 0)
      .to(
        node,
        0.8,
        {
          opacity: 1,
        },
        '+=0.1'
      )
      .to(
        [node, mapButton],
        1.5,
        {
          filter: 'blur(0)',
          autoRound: false,
        },
        '+=0'
      )
    // .fromTo(
    //   top!,
    //   0.8,
    //   {
    //     // scaleY: 1,
    //     filter: "blur(15px)"
    //   },
    //   {
    //     // scaleY: 1,
    //     filter: "blur(0)",
    //     autoRound: false,
    //     ease: Power2.easeInOut,
    //   },
    //   '+=0'
    // )
    // .add('topEnd')
    // .fromTo(
    //   topRound!,
    //   0.8,
    //   {
    //     scale: 1,
    //     filter: "blur(15px)",
    //   },
    //   {
    //     scale: 1,
    //     filter: "blur(0)",
    //     autoRound: false,
    //     ease: Power2.easeInOut,
    //   },
    //   'topEnd-=0.25'
    // )

    // letters

    const staggerTotalTime = 0.05

    // tl.add('letters', '+=0')
    //   .staggerFromTo(
    //     topRoundTextLetters,
    //     1.2,
    //     {
    //       filter: 'blur(15px)',
    //       opacity: 0,
    //     },
    //     {
    //       autoRound: false,
    //       opacity: 1,
    //       filter: 'blur(0)',
    //       // ease: Power2.easeOut,
    //     },
    //     staggerTotalTime / 13,
    //     'letters'
    //   )
    //   .staggerFromTo(
    //     bottomTextLetters,
    //     1.2,
    //     {
    //       filter: 'blur(15px)',
    //       opacity: 0,
    //     },
    //     {
    //       autoRound: false,
    //       opacity: 1,
    //       filter: 'blur(0)',
    //       // ease: Power2.easeOut,
    //     },
    //     staggerTotalTime / 5,
    //     'letters'
    //   )
    //   .set(
    //     mapButtonText,
    //     {
    //       opacity: 1,
    //     },
    //     'letters'
    //   )
    //   .staggerFromTo(
    //     mapButtonTextLetters,
    //     1.3,
    //     {
    //       filter: 'blur(15px)',
    //       opacity: 0,
    //     },
    //     {
    //       autoRound: false,
    //       opacity: 1,
    //       filter: 'blur(0)',
    //       // ease: Power2.easeOut,
    //     },
    //     staggerTotalTime / 3,
    //     'letters'
    //   )
  }

  // Exit : transition
  const onExitTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    tl.add(() => {
      setIsMapButtonMenu(false)
    }, 0)
      .fromTo(
        node,
        0.8,
        {
          filter: 'blur(0)',
        },
        {
          filter: 'blur(15px)',
          autoRound: false,
          ease: Power2.easeInOut,
        }
      )
      .fromTo(
        node,
        0.8,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          ease: Power2.easeInOut,
        },
        0.2
      )
  }

  // Exit : end
  const onExited = () => {
    // set current page with page in queue store in next page
    setCurrentPagePath(nextPagePath)
  }

  const addEndListener = (node: HTMLElement, done: () => void) => {
    show ? onEnterTransition(node, done) : onExitTransition(node, done)
  }

  return (
    <Transition
      in={show}
      unmountOnExit
      timeout={10000}
      onEnter={onEnter}
      onExited={onExited}
      addEndListener={addEndListener}
      appear={true}
    >
      <Menu />
    </Transition>
  )
}

export default observer(TransitionComponent)
