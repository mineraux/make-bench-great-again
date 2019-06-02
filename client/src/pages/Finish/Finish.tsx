import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
import Button, { themes as buttonThemes } from '../../components/Button/Button'
import { ReactComponent as Progress } from './progress.svg'
// styles
import './finish.scss'
import { useWindowSize } from '../../utils/hooks'
import { TweenMax, TimelineMax } from 'gsap'

type Props = pageProps

const Finish: FunctionComponent<Props> = ({ match }) => {
  const ref = useRef<HTMLDivElement>(null)
  const windowHeight = useWindowSize().height
  const [strokeDashArray, setStrokeDashArray] = useState(0)

  // const currentStep = 4;
  // const totalStep = 5;

  useEffect(() => {
    if (ref.current) {
      const path = ref.current.querySelector(
        '.page-finish__svg #progressPath'
      ) as SVGPathElement
      const length = path.getTotalLength()
      setStrokeDashArray(length)

      const tl = new TimelineMax()
      tl.fromTo(
        path,
        5,
        {
          strokeDashoffset: length - length / 6,
        },
        {
          strokeDashoffset: 0,
          delay: 1.5,
        }
      )
    }
  }, [])

  const steps = [
    { color: 'red' },
    { color: 'green' },
    { color: 'yellow' },
    { color: 'purple' },
    { color: '#ff9800' },
    { color: 'yellow' },
  ]

  const renderSvg = () => (
    <svg
      overflow="visible"
      viewBox="0 0 561.5 1071.5"
      xmlns="http://www.w3.org/2000/svg"
      className={'page-finish__svg'}
    >
      <path
        id="motionPath"
        d="m280.75.25c154.92 0 280.5 125.58 280.5 280.5v510c0 154.92-125.58 280.5-280.5 280.5-154.92 0-280.5-125.58-280.5-280.5v-510c0-154.92 125.58-280.5 280.5-280.5z"
        fill="none"
        stroke="#efcaca"
        strokeMiterlimit="10"
        strokeWidth=".5"
      />
      <path
        id="progressPath"
        d="m280.75.25c154.92 0 280.5 125.58 280.5 280.5v510c0 154.92-125.58 280.5-280.5 280.5-154.92 0-280.5-125.58-280.5-280.5v-510c0-154.92 125.58-280.5 280.5-280.5z"
        fill="none"
        stroke="red"
        strokeMiterlimit="10"
        strokeWidth="5"
        strokeDasharray={strokeDashArray}
      />
      {steps.map((step, index) => (
        <circle r="20" strokeWidth="0.5" key={index}>
          <animateMotion
            calcMode="linear"
            dur="0s"
            keyPoints={`${(1 / steps.length) * index};${(1 / steps.length) *
              index}`}
            keyTimes="0;1"
            repeatCount={1}
            fill="freeze"
          >
            <mpath xlinkHref="#motionPath" />
          </animateMotion>
          <animate
            attributeType="CSS"
            attributeName="opacity"
            begin="0"
            from="0"
            to="1"
            dur="1s"
            repeatCount="1"
            fill="freeze"
          />
        </circle>
      ))}
    </svg>
  )
  return (
    <div
      className={'page-finish'}
      ref={ref}
      style={{
        minHeight: windowHeight,
      }}
    >
      {/*<Progress className={'page-finish__svg'} />*/}
      {renderSvg()}

      <p className="page-finish__counter">01-05</p>

      <p className="page-finish__title">Pétition(s) signée(s)</p>

      <p className="page-finish__text">
        C’est un bon début !<br />
        Tu as relevé le premier défis, pour signer d’autre pétitions rends toi à
        la prochaine oeuvre.
      </p>

      <Button
        className={'page-finish__button'}
        label={'Retour à la map'}
        theme={buttonThemes.Green}
        link={config.routes.Map.path}
      />
    </div>
  )
}

export default Finish
