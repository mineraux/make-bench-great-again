import React, {FunctionComponent, ReactNode} from 'react';
import {Transition} from 'react-transition-group';
import {TimelineMax, TweenMax} from 'gsap'
import PageStore from '../../store/PageStore'
import {observer} from 'mobx-react-lite'

interface Props {
  show: boolean,
  children: ReactNode
}

const TransitionComponent: FunctionComponent<Props> = ({show, children}) => {

  const {setCurrentPagePath, nextPagePath} = PageStore

  // Enter : start
  const onEnter = (node: HTMLElement): void => {
    TweenMax.set(node, {
      autoAlpha: 0,
      x: -100
    })
  }

  // Enter : transition
  const onEnterTransition = (node: HTMLElement, done: () => void): void => {

    const tl = new TimelineMax({
      onComplete: done
    })

    tl.to(node, 1, {
      autoAlpha: 1,
      x: 0
    })
  }

  // Exit : transition
  const onExitTransition = (node: HTMLElement, done: () => void): void => {

    const tl = new TimelineMax({
      onComplete: done
    })

    tl.to(node, 1, {
      autoAlpha: 0,
      x: 100
    })
  }

  // Exit : end
  const onExited = () => {
    // set current page with page in queue store in next page
    setCurrentPagePath(nextPagePath)
  }

  return (
    <Transition
      in={show}
      unmountOnExit
      timeout={10000}
      onEnter={onEnter}
      onExited={onExited}
      addEndListener={(node, done) => {
        show ? onEnterTransition(node, done) : onExitTransition(node, done)
      }}
    >
      {children}
    </Transition>
  )
}

export default observer(TransitionComponent)