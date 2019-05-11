import React, { FunctionComponent, useState } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
import { Tweet } from 'react-twitter-widgets'
// styles
import './twitter.scss'
import TwitterThumbnail from '../../components/TwitterThumbnail/TwitterThumbnail'

type Props = pageProps

const Twitter: FunctionComponent<Props> = () => {
  const [value, setValue] = useState<string>('')
  const [tweets, setTweets] = useState<string[]>([])

  let input: HTMLInputElement | null = null

  const onInputChange = (e: any) => {
    setValue(e.target.value)
  }

  const onClickSubmit = () => {
    const hashtag: string = input!.value
    fetchTweets(hashtag)
  }

  const fetchTweets = (hashtag: string) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/twitter/${hashtag}`, {
      method: 'POST',
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error('Failed to fetch tweets')
        }
        res.json().then(res2 => {
          setTweets([])
          res2.statuses.map((tweet: any) => {
            setTweets(previousState => [...previousState, tweet.id_str])
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const renderTweets = () => {
    if (tweets.length > 0) {
      console.log('render tweets', tweets)
      return tweets.map(tweet => (
        <div className="page-twitter__tweets-container__tweet" key={tweet}>
          <Tweet tweetId={tweet} />
        </div>
      ))
    }
  }

  const pageContent = () => (
    <div className={'page-twitter'}>
      <div className="page-twitter__input-container">
        <input
          type="text"
          ref={el => (input = el)}
          value={value}
          onChange={onInputChange}
        />
        <div
          className="page-twitter__input-container__button"
          onClick={onClickSubmit}
        >
          🐦 Search tweets 🐦
        </div>
      </div>
      <TwitterThumbnail
        url={'https://twitter.com'}
        image={'https://via.placeholder.com/500x750'}
        author={'TwitterFrance'}
        likeCount={'103'}
      />
      <div className="page-twitter__tweets-container">{renderTweets()}</div>
    </div>
  )

  return pageContent()
}

export default Twitter
