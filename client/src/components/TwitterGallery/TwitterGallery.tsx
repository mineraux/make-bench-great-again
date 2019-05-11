import React, { FunctionComponent, useEffect, useState } from 'react'
import Classnames from 'classnames'
import './twitter-gallery.scss'
import { ReactComponent as TwitterLogo } from './twitter.svg'
import TwitterThumbnail, {
  Props as twitterThumbnailProps,
} from '../TwitterThumbnail/TwitterThumbnail'

type Props = {
  className?: string
  totalNumber: string | number
  tweets: twitterThumbnailProps[]
}

const TwitterGallery: FunctionComponent<Props> = ({
  className,
  totalNumber,
  tweets,
}) => {
  return (
    <div className={Classnames(className, 'twitter-gallery')}>
      <div className="twitter-gallery__informations">
        <TwitterLogo />
        <p>{totalNumber} passants ont relevé la performance</p>
      </div>
      <div className="twitter-gallery__thumbnails">
        {tweets.map(tweet => (
          <TwitterThumbnail
            {...tweet}
            className="twitter-gallery__thumbnails__thumbnail"
          />
        ))}
      </div>
    </div>
  )
}

export default TwitterGallery
