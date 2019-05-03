import React, { FunctionComponent } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'

type Props = pageProps

const Home: FunctionComponent<Props> = ({ show }) => {

  return (
    <Transition show={show}>
      <div className={'page-home'}>
        <p>Page : Home</p>
      </div>
    </Transition>
  )
}

export default Home
