import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
import Button, { themes as buttonThemes } from '../../components/Button/Button'
import { ReactComponent as Progress } from './progress.svg'
// styles
import './finish.scss'
import { useWindowSize } from '../../utils/hooks'

type Props = pageProps

const Finish: FunctionComponent<Props> = ({ match }) => {
  const ref = useRef<HTMLDivElement>(null)
  const windowHeight = useWindowSize().height
  return (
    <div
      className={'page-finish'}
      ref={ref}
      style={{
        minHeight: windowHeight,
      }}
    >
      <Progress className={'page-finish__svg'} />

      <p className="page-finish__counter">01-05</p>

      <p className="page-finish__title">Pétition(s) signée(s)</p>

      <p className="page-finish__text">
        C’est un bon début !<br />
        Tu as relevé le premier défis, pour signer d’autre pétitions rends toi à
        la prochaine oeuvre.
      </p>

      <Button
        className={'page-finish__button'}
        label={'Retour à la map'}
        theme={buttonThemes.Green}
        link={config.routes.Map.path}
      />
    </div>
  )
}

export default Finish
