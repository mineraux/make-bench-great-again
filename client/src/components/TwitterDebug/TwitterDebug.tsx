import React, { FunctionComponent, useEffect, useState } from 'react'

import { Tweet } from 'react-twitter-widgets'
// styles
import './twitter-debug.scss'

type Props = {
  hashtags: string[]
}

const TwitterDebug: FunctionComponent<Props> = ({ hashtags }) => {
  const [tweets, setTweets] = useState<string[]>([])

  useEffect(() => {
    const fetchTweets = (hashtagsValues: string[]) => {
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
            console.log(resJSON)
            const newTweets: string[] = []
            resJSON.statuses.map((tweet: any) => {
              newTweets.push(tweet.id_str)
            })
            setTweets(newTweets)
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (hashtags.length > 0) {
      fetchTweets(hashtags)
    }
  }, [hashtags])

  const renderTweets = () => {
    if (tweets.length > 0) {
      return tweets.map(tweet => (
        <div className="twitter-debug__tweets-container__tweet" key={tweet}>
          <Tweet tweetId={tweet} />
        </div>
      ))
    }
  }

  return (
    <div className={'twitter-debug'}>
      <div className="twitter-debug__tweets-container">{renderTweets()}</div>
    </div>
  )
}

export default TwitterDebug
