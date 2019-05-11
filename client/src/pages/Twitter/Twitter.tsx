import React, { FunctionComponent, Fragment, useEffect, useState } from 'react'
import Transition from './Transition'
import { pageProps } from '../types'
// styles
import './twitter.scss'
import TwitterGallery from '../../components/TwitterGallery/TwitterGallery'
import TwitterDebug from '../../components/TwitterDebug/TwitterDebug'

type Props = pageProps

const Twitter: FunctionComponent<Props> = () => {
  const [value, setValue] = useState<string>('')
  const [hashtag, setHashtag] = useState<string[]>([])

  let input: HTMLInputElement | null = null

  const onInputChange = (e: any) => {
    setValue(e.target.value)
  }

  const onClickSubmit = () => {
    setHashtag([input!.value])
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

      {hashtag.length > 0 && (
        <Fragment>
          <TwitterGallery totalNumber={'200'} hashtags={hashtag} />
          {/*<TwitterDebug hashtags={hashtag} />*/}
        </Fragment>
      )}
    </div>
  )

  return pageContent()
}

export default Twitter
