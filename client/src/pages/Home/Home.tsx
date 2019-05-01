import React, { FunctionComponent } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import { observer } from 'mobx-react-lite'
import PageStore from '../../store/PageStore'

type Props = pageProps

const Home: FunctionComponent<Props> = ({ show, match }) => {

  const { pageExiting } = PageStore

  return (
    <Transition show={show && !pageExiting}>
      <div className={'page-home'}>
        <p>Page : Home</p>
      </div>
    </Transition>
  )
}

export default observer(Home)
