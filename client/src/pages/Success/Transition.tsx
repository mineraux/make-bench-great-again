import React, { FunctionComponent } from 'react'
import { Transition } from 'react-transition-group'
import { TimelineMax, TweenMax, Power2 } from 'gsap'
import { pageTransitionProps } from '../types'
import Success from './Success'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../store'
import { themes } from '../../components/Header/Header'

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
      .add(() => {
        NavigationStore.setHeaderThemes(themes.Green)
      })
      .add('background', '+=0.5')
      .staggerFromTo(
        [
          '.page-success__presentation',
          '.page-success__presentation__title',
          '.page-success__presentation__text-content',
          '.page-success__presentation__discover-button',
        ],
        0.8,
        {
          filter: 'blur(12px)',
          opacity: 0,
        },
        {
          autoRound: false,
          opacity: 1,
          filter: 'blur(0)',
          ease: Power2.easeInOut,
        },
        0.15,
        'background'
      )
  }

  // Exit : transition
  const onExitTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    tl.to(
      node,
      0.25,
      {
        opacity: 0,
        ease: 'Sine.easeInOut',
      },
      1
    ).add(() => {
      NavigationStore.setHeaderThemes(themes.Blue)
    }, 1)
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
      <Success match={match} history={history} />
    </Transition>
  )
}

export default observer(TransitionComponent)
