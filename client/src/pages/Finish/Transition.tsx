import React, { FunctionComponent, ReactNode, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { TimelineMax, TweenMax } from 'gsap'
import { NavigationStore } from '../../store'
import { observer } from 'mobx-react-lite'
import Finish from './Finish'
import { pageTransitionProps } from '../types'

type Props = pageTransitionProps

const TransitionComponent: FunctionComponent<Props> = ({ show }) => {
  const { setCurrentPagePath, nextPagePath } = NavigationStore

  // Enter : start
  const onEnter = (node: HTMLElement): void => {
    TweenMax.set(node, {
      autoAlpha: 0,
      x: -100,
    })
  }

  // Enter : transition
  const onEnterTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    tl.to(node, 1, {
      autoAlpha: 1,
      x: 0,
    })
  }

  // Exit : transition
  const onExitTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    tl.to(node, 1, {
      autoAlpha: 0,
      x: 100,
    })
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
      <Finish />
    </Transition>
  )
}

export default observer(TransitionComponent)
