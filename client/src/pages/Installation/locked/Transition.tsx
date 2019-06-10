import React, { FunctionComponent } from 'react'
import { Transition } from 'react-transition-group'
import {
  TimelineMax,
  TweenMax,
  Sine,
  Power1,
  Power2,
  Power3,
  Power4,
} from 'gsap'
import { pageTransitionProps } from '../../types'
import InstallationLocked from './InstallationLocked'
import { observer } from 'mobx-react-lite'
import { NavigationStore } from '../../../store'

type Props = pageTransitionProps

const TransitionComponent: FunctionComponent<Props> = ({
  show,
  match,
  history,
}) => {
  const { setCurrentPagePath, nextPagePath } = NavigationStore

  // Enter : start
  const onEnter = (node: HTMLElement) => {
    console.log('instalation locked : on enter')

    const firstPart = node.querySelector(
      '.page-installation--locked__wrapper__part--first-part'
    )
    TweenMax.set(firstPart!, {
      opacity: 0,
      filter: 'blur(15px)',
    })
  }

  // Enter : transition
  const onEnterTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
      delay: 0,
    })

    const firstPart = node.querySelector(
      '.page-installation--locked__wrapper__part--first-part'
    )

    tl.to(
      firstPart!,
      2.5,
      {
        opacity: 1,
        ease: Power2.easeIn,
      },
      0
    )
      .to(
        firstPart!,
        2.5,
        {
          filter: 'blur(0)',
          autoRound: false,
          ease: Power1.easeOut,
        },
        1
      )
      .add(() => {
        NavigationStore.setIsScrollIndicationVisible(true)
      }, '-=0.8')
  }

  // Exit : transition
  const onExitTransition = (node: HTMLElement, done: () => void): void => {
    const tl = new TimelineMax({
      onComplete: done,
    })

    const firstPart = node.querySelector(
      '.page-installation--locked__wrapper__part--first-part'
    )

    tl.fromTo(
      firstPart!,
      0.8,
      {
        filter: 'blur(0)',
      },
      {
        filter: 'blur(15px)',
        autoRound: false,
        ease: Power2.easeInOut,
      },
      0
    ).fromTo(
      firstPart!,
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
      <InstallationLocked match={match} history={history} />
    </Transition>
  )
}

export default observer(TransitionComponent)
