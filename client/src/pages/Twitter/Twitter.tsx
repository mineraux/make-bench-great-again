import React, { Component, Fragment } from 'react'
import { Transition } from 'react-transition-group'
import { TweenLite } from 'gsap'
import { pageProps } from '../types'
import { Tweet } from 'react-twitter-widgets'
//styles
import './twitter.scss'

type Props = pageProps & {}

type State = {
  value: string
  tweets: string[]
}

class Twitter extends Component<Props, State> {
  input: HTMLInputElement | null = null

  state: State = {
    value: '',
    tweets: [],
  }

  onInputChange = (e: any) => {
    this.setState({
      value: e.target.value,
    })
  }

  onClickSubmit = () => {
    const hashtag: string = this.input!.value
    this.fetchTweets(hashtag)
  }

  componentDidUpdate(
    prevProps: Readonly<Props & {}>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (window.twttr && this.state.tweets !== prevState.tweets) {
      window.twttr.widgets.load()
    }
  }

  fetchTweets = (hashtag: string) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/twitter/${hashtag}`, {
      method: 'POST',
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error('Failed to fetch tweets')
        }
        res.json().then(res => {
          this.setState({ tweets: [] }, () => {
            res.statuses.map((tweet: any) => {
              this.setState(previousState => ({
                tweets: [...previousState.tweets, tweet.id_str],
              }))
            })
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderTweets = () => {
    if (this.state.tweets.length > 0) {
      console.log('render tweets', this.state.tweets)
      return this.state.tweets.map(tweet => (
        <div className="page-twitter__tweets-container__tweet" key={tweet}>
          <Tweet tweetId={tweet} />
        </div>
      ))
    }
  }

  pageContent = () => (
    <div className={'page-twitter'}>
      <p>Page : twiter</p>
      <div className="page-twitter__input-container">
        <input
          type="text"
          ref={el => (this.input = el)}
          value={this.state.value}
          onChange={this.onInputChange}
        />
        <div
          className="page-twitter__input-container__button"
          onClick={this.onClickSubmit}
        >
          🐦 Search tweets 🐦
        </div>
      </div>
      <div className="page-twitter__tweets-container">
        {this.renderTweets()}
      </div>
    </div>
  )

  render() {
    const { show } = this.props
    return (
      <Transition
        in={show}
        unmountOnExit
        timeout={8000}
        onEnter={node =>
          TweenLite.set(node, {
            autoAlpha: 0,
            x: -50,
          })
        }
        addEndListener={(node, done) => {
          TweenLite.to(node, 0.5, {
            autoAlpha: show ? 1 : 0,
            x: show ? 0 : 200,
            onComplete: done,
          })
        }}
      >
        {this.pageContent()}
      </Transition>
    )
  }
}

export default Twitter
