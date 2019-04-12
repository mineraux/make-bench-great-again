import React, {Component, Fragment} from 'react';
import {Transition } from 'react-transition-group';
import {TweenLite} from 'gsap';
import {pageProps} from '../types'
import TweetEmbed from 'react-tweet-embed'
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
    value: "",
    tweets:["692527862369357824"]
  }

  onInputChange = (e : any) => {
    this.setState({
      value: e.target.value
    })
  }

  onClickSubmit = () => {
    console.log(this.input && this.input.value);

    const hashtag: string = this.input!.value

    this.fetchTweets(hashtag)
  }


  fetchTweets = (hashtag: string) => {

    fetch(`${process.env.REACT_APP_SERVER_URL}/twitter/${hashtag}`, {
      method: 'POST'
    }).then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw Error('Failed')
        }
        console.log("TWEETS !!!!", res.json().then(res => {
          console.log(res.statuses);
          this.setState({
            tweets: []
          }, () => {
            res.statuses.map((tweet : any) => {
              this.setState({
                tweets: [
                  ...this.state.tweets,
                  (tweet.id).toString()
                ]
              })
            })
          })

        }))
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderTweets = () => {
    if(this.state.tweets.length > 0) {
      console.log("render tweets", this.state.tweets);
      return this.state.tweets.map((tweet, index) => (
          <Fragment key={tweet}>
            <TweetEmbed id={tweet}/>
          </Fragment>
        )
      )
    } else {
      return null
    }
  }

  pageContent = () => (
    <div className={"page-twitter"}>
      <p>Page : twiter</p>
      <div className="page-twitter__input-container">
        <input type="text" ref={el => this.input = el} value={this.state.value} onChange={this.onInputChange}/>
        <div className="page-twitter__input-container__button" onClick={this.onClickSubmit}>🐦 Search tweets 🐦</div>
      </div>
      <div className="page-twitter__tweets-container">
        {this.renderTweets()}
      </div>

    </div>
  )

  render() {
    const {show} = this.props
    return (
      <Transition
        in={show}
        unmountOnExit
        timeout={8000}
        onEnter={node => TweenLite.set(node, {
          autoAlpha: 0,
          x: -50
        })}
        addEndListener={(node, done) => {
          TweenLite.to(node, 0.5, {
            autoAlpha: show ? 1 : 0,
            x: show ? 0 : 200,
            onComplete: done
          });
        }}
      >
        {this.pageContent()}
      </Transition>

    )
  }
}

export default Twitter;