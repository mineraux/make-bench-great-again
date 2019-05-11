import React, { FunctionComponent, useEffect, useState } from 'react'
import Classnames from 'classnames'
import './twitter-thumbnail.scss'
import { ReactComponent as Heart } from './heart.svg'

type Props = {
  className?: string
  url: string
  image: string
  author: string
  likeCount: string
}

const TwitterThumbnail: FunctionComponent<Props> = ({
  className,
  url,
  image,
  author,
  likeCount,
}) => {
  return (
    <div className={Classnames(className, 'twitter-thumbnail')}>
      <a href={url} className="twitter-thumbnail__image">
        <img src={image} alt="" />
      </a>
      <div className="twitter-thumbnail__informations">
        <a
          className="twitter-thumbnail__informations__author"
          href={`https://twitter.com/${author}`}
        >
          @{author}
        </a>
        <span className="twitter-thumbnail__informations__like">
          {likeCount}
        </span>
        <Heart className="twitter-thumbnail__informations__heart" />
      </div>
    </div>
  )
}

export default TwitterThumbnail
