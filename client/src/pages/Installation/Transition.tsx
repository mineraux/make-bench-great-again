import React, { FunctionComponent } from 'react'
import { Transition } from 'react-transition-group'
import { TimelineMax, TweenMax } from 'gsap'
import { pageTransitionProps } from '../types'
import Installation from './Installation'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'

type Props = pageTransitionProps

const TransitionComponent: FunctionComponent<Props> = ({
  show,
  match,
  history,
}) => {
  const { setCurrentPagePath, nextPagePath } = NavigationStore

  // Enter : start
  const onEnter = (node: HTMLElement) => {
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

    tl.to(node, 0.25, {
      opacity: 0,
      ease: 'Sine.easeInOut',
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
      <Installation match={match} history={history} />
    </Transition>
  )
}

export default observer(TransitionComponent)
