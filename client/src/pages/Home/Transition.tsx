import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { TimelineMax, TweenMax, Power1 } from 'gsap'
import { NavigationStore } from '../../store'
import { observer } from 'mobx-react-lite'
import Home from './Home'
import { pageTransitionProps } from '../types'

type Props = pageTransitionProps

const TransitionComponent: FunctionComponent<Props> = ({ show }) => {
  const { setCurrentPagePath, nextPagePath } = NavigationStore

  // Enter : start
  const onEnter = (node: HTMLElement): void => {
    TweenMax.set(node, {
      opacity: 0,
    })
  }

  // Enter : transition
  const onEnterTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    tl.to(node, 0.25, {
      opacity: 1,
      ease: 'Sine.easeInOut',
    })
  }

  // Exit : transition
  const onExitTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    const splashscreenAnimationNode = node.querySelector(
      '.splashscreen-animation'
    )
    const homeContainerWrapperNode = node.querySelector(
      '.page-home__containers-wrapper'
    )

    tl.fromTo(
      [splashscreenAnimationNode, homeContainerWrapperNode],
      0.8,
      {
        filter: 'blur(0)',
      },
      {
        filter: 'blur(15px)',
        autoRound: false,
        ease: Power1.easeInOut,
      }
    ).fromTo(
      [splashscreenAnimationNode, homeContainerWrapperNode],
      0.6,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        ease: Power1.easeInOut,
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
    >
      <Home />
    </Transition>
  )
}

export default observer(TransitionComponent)
