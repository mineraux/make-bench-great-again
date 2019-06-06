import React, { FunctionComponent, useEffect, useState } from 'react'
import ClassNames from 'classnames'
import './tuto-twitter.scss'
import Button, { themes as buttonThemes } from '../Button/Button'
import { useWindowSize, getHeaderHeight } from '../../utils/hooks'
import TutoImage from '../../assets/images/tuto.png'

type Props = {
  className?: string
}

const TwitterDebug: FunctionComponent<Props> = ({ className }) => {
  const getTwitterUrl = (): string => {
    const tweet = `À l'occasion de la Nuit Blanche, grace à l'Envers du décors, j'ai essayé de m'installer sur des dispositifs anti-SDF...`
    const uri = `https://twitter.com/intent/tweet?text=${tweet}`
    return encodeURI(uri)
  }

  const windowHeight = useWindowSize().height

  return (
    <div
      className={ClassNames('tuto-twitter', className)}
      style={{
        height: windowHeight - getHeaderHeight(),
      }}
    >
      <div className="tuto-twitter__wrapper">
        <p className="tuto-twitter__wrapper__title">Comment participer ?</p>
        <img className="tuto-twitter__wrapper__figure" src={TutoImage} alt="" />
        <p className="tuto-twitter__wrapper__informations">
          Nous allons te rediriger vers Twitter. Prends-toi en photo depuis
          l’application et poste-la sur ton profil avec le hashtag
          #lenversdudécor.
        </p>
        <Button
          label="J'ai compris"
          theme={buttonThemes.Blue}
          url={getTwitterUrl()}
          icon={true}
        />
      </div>
    </div>
  )
}

export default TwitterDebug
