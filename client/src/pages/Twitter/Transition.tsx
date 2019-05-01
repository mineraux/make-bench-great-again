import React, { FunctionComponent, ReactNode} from 'react';
import {Transition} from 'react-transition-group';
import {TimelineMax, TweenMax} from 'gsap'
import PageStore from '../../store/PageStore'

interface Props {
  show: boolean,
  children: ReactNode
}

const TransitionComponent: FunctionComponent<Props> = ({show, children}) => {

  const {pageExiting, setPageExiting} = PageStore

  // Initial state before transition
  const onEnter = (node: HTMLElement) => {
    TweenMax.set(node, {
      autoAlpha: 0,
      x: -100
    })
  }

  const onExit = () => {
    setPageExiting(true)
  }

  // Enter transition
  const onEnterTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done
    })

    tl.to(node, 1, {
      autoAlpha: 1,
      x: 0
    })
  }

  // Exit Transition
  const onExitTransition = (node: HTMLElement, done: () => void): void => {

    setPageExiting(true)

    const tl = new TimelineMax({
      onComplete: () => {
        setPageExiting(false)
        done()
      }
    })

    tl.to(node, 1, {
      autoAlpha: 0,
      x: 100
    })
  }

  return (
    <Transition
      in={show}
      unmountOnExit
      timeout={10000}
      onEnter={onEnter}
      pageExiting={onExit}
      addEndListener={(node, done) => {
        show ? onEnterTransition(node, done) : onExitTransition(node, done)
      }}
    >
      {children}
    </Transition>
  )
}

export default TransitionComponent