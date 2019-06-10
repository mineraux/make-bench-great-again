import React, { FunctionComponent, Fragment, useEffect, useState } from 'react'
import Classnames from 'classnames'
import './twitter-gallery.scss'
import { ReactComponent as TwitterLogo } from './twitter.svg'
import TwitterThumbnail, {
  Props as twitterThumbnailProps,
} from '../TwitterThumbnail/TwitterThumbnail'

import fakeData from './fakeData'

type Props = {
  className?: string
  totalNumber: string | number
  hashtags: string[]
  limit?: number
  isFake?: boolean
}

type Tweet = twitterThumbnailProps & { id: string }

const TwitterGallery: FunctionComponent<Props> = ({
  className,
  totalNumber,
  hashtags,
  limit = 100,
  isFake,
}) => {
  const [tweets, setTweets] = useState<Tweet[]>([])
  useEffect(() => {
    const fetchTweets = (hashtagsValues: string[]) => {
      if (isFake) {
        const newTweets: Tweet[] = []
        fakeData.forEach(({ id, image, url, author, likeCount }) => {
          newTweets.push({ id, image, url, author, likeCount })
        })
        setTweets(newTweets)
      } else {
        fetch(`${process.env.REACT_APP_SERVER_URL}/twitter`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hashtags: hashtagsValues,
          }),
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw Error('Failed to fetch tweets')
            }
            res.json().then(resJSON => {
              const newTweets: Tweet[] = []
              resJSON.statuses.map((tweet: any) => {
                if (
                  tweet.retweeted_status &&
                  tweet.retweeted_status.extended_entities &&
                  tweet.retweeted_status.extended_entities.media.length > 0 &&
                  tweet.retweeted_status.extended_entities.media[0].type ===
                    'photo'
                ) {
                  newTweets.push({
                    id: tweet.id_str,
                    url: `https://twitter.com/${
                      tweet.retweeted_status.user.id_str
                    }/status/${tweet.id_str}`,
                    image: tweet.retweeted_status.entities.media[0].media_url,
                    author: tweet.retweeted_status.user.screen_name,
                    likeCount: tweet.retweeted_status.favorite_count,
                  })
                } else if (
                  tweet.extended_entities &&
                  tweet.extended_entities.media.length > 0 &&
                  tweet.extended_entities.media[0].type === 'photo'
                ) {
                  newTweets.push({
                    id: tweet.id_str,
                    url: `https://twitter.com/${tweet.user.id_str}/status/${
                      tweet.id_str
                    }`,
                    image: tweet.extended_entities.media[0].media_url,
                    author: tweet.user.screen_name,
                    likeCount: tweet.favorite_count,
                  })
                }
              })
              setTweets(newTweets)
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    fetchTweets(hashtags)
  }, [hashtags])

  const renderTwitterThumbnails = () =>
    tweets.map((tweet, index) => {
      if (index <= limit - 1) {
        return (
          <Fragment key={tweet.id}>
            <TwitterThumbnail
              {...tweet}
              className="twitter-gallery__thumbnails__thumbnail"
            />
          </Fragment>
        )
      }
    })

  return (
    <div className={Classnames(className, 'twitter-gallery')}>
      <div className="twitter-gallery__informations">
        <TwitterLogo />
        {tweets.length === 1 ? (
          <p>{tweets.length} passant a relevé la performance</p>
        ) : (
          <p>{tweets.length} passants ont relevé la performance</p>
        )}
      </div>
      <div className="twitter-gallery__thumbnails">
        {renderTwitterThumbnails()}
      </div>
    </div>
  )
}

export default TwitterGallery
