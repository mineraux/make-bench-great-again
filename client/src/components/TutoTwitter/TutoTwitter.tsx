import React, { FunctionComponent, useEffect, useState } from 'react'
import ClassNames from 'classnames'
import './tuto-twitter.scss'
import Button, { themes as buttonThemes } from '../Button/Button'
import { useWindowSize } from '../../utils/hooks'
import { getHeaderHeight } from '../../utils'
import { TweenMax } from 'gsap'
import TutoVideo from '../../assets/video/tuto.mp4'
import mockup from '../../assets/images/mockup.png'
import { ApiInstallation } from '../../@types'

type Props = {
  className?: string
  hashtags?: ApiInstallation['hashTags']
}

const TwitterDebug: FunctionComponent<Props> = ({ className, hashtags }) => {
  const getTwitterUrl = (): string => {
    const tweet = `À l'occasion de la Nuit Blanche, grace à l'Envers du décor, j'ai essayé de m'installer sur des dispositifs anti-SDF...`

    let uri = encodeURI(`https://twitter.com/intent/tweet?text=${tweet}`)
    uri += encodeURIComponent(` #lenversdudecor`)
    if (hashtags) {
      hashtags.forEach(hashtag => {
        uri += encodeURIComponent(` #${hashtag}`)
      })
    }

    return uri
  }

  const windowHeight = useWindowSize().height

  const onClickButton = () => {
    TweenMax.set('.tuto-twitter', { className: '+=hidden' })
  }

  return (
    <div
      className={ClassNames('tuto-twitter', className)}
      style={{
        height: windowHeight - getHeaderHeight(),
      }}
    >
      <div className="tuto-twitter__wrapper">
        <p className="tuto-twitter__wrapper__title">Comment participer ?</p>
        <div className="tuto-twitter__wrapper__video-wrapper">
          <img
            src={mockup}
            alt=""
            className="tuto-twitter__wrapper__video-wrapper__mockup"
          />
          <video
            className="tuto-twitter__wrapper__video-wrapper__video"
            muted={true}
            autoPlay
          >
            <source src={TutoVideo} type="video/mp4" />
            Désolé, votre navigateur ne supporte pas les fichiers videos
          </video>
        </div>
        <p className="tuto-twitter__wrapper__informations">
          Nous allons te rediriger vers Twitter. Prends-toi en photo depuis
          l’application et poste-la sur ton profil avec le hashtag
          #lenversdudécor.
        </p>
        <Button
          label="J'ai compris"
          theme={buttonThemes.Blue}
          url={getTwitterUrl()}
          onClick={onClickButton}
          icon={true}
        />
      </div>
    </div>
  )
}

export default TwitterDebug
