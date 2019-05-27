import React, { FunctionComponent, ReactNode } from 'react'
import { Transition } from 'react-transition-group'
import { TimelineMax, TweenMax, Sine, Power1, Power2, Power3 } from 'gsap'
import { NavigationStore } from '../../store'
import { observer } from 'mobx-react-lite'
import Map from './Map'
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

    tl.to(node, 2.5, {
      opacity: 1,
      ease: Power3.easeInOut,
    }).fromTo(
      node,
      2.5,
      {
        filter: 'blur(15px)',
      },
      {
        filter: 'blur(0)',
        autoRound: false,
        ease: Power3.easeInOut,
      },
      0.5
    )
  }

  // Exit : transition
  const onExitTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: () => {
        done()
      },
    })

    tl.fromTo(
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
    ).fromTo(
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
      <Map />
    </Transition>
  )
}

export default observer(TransitionComponent)
