import React, { FunctionComponent, ReactNode } from 'react'
import { Transition } from 'react-transition-group'
import { TimelineMax, TweenMax } from 'gsap'

interface Props {
  show: boolean
  children: ReactNode
}

const TransitionComponent: FunctionComponent<Props> = ({ show, children }) => {
  // Initial state before transition
  const onEnter = (node: HTMLElement) => {
    TweenMax.set(node, {
      autoAlpha: 0,
      x: -100,
    })
  }

  // Enter transition
  const onEnterTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    tl.to(node, 1, {
      autoAlpha: 1,
      x: 0,
    })
  }

  // Exit Transition
  const onExitTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    tl.to(node, 1, {
      autoAlpha: 0,
      x: 100,
    })
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
      addEndListener={addEndListener}
    >
      {children}
    </Transition>
  )
}

export default TransitionComponent
