import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
import Button, { themes as buttonThemes } from '../../components/Button/Button'
import { ReactComponent as BackgroundSvg } from './background.svg'
// styles
import './finish.scss'
import { useWindowSize } from '../../utils/hooks'
import { TimelineMax, Power1 } from 'gsap'

type Props = pageProps

const Finish: FunctionComponent<Props> = ({ match }) => {
  const ref = useRef<HTMLDivElement>(null)
  const windowHeight = useWindowSize().height
  const [strokeDashArray, setStrokeDashArray] = useState(0)

  const currentStep = 3
  const totalStep = 5

  useEffect(() => {
    if (ref.current) {
      const svg = ref.current.querySelector('.page-finish__svg') as SVGElement

      const path = ref.current.querySelector(
        '.page-finish__svg #progressPath'
      ) as SVGPathElement
      const length = path.getTotalLength()
      setStrokeDashArray(length)

      const circles = ref.current.querySelectorAll(
        '.page-finish__svg circle'
      ) as NodeListOf<SVGCircleElement>

      // init circle style
      for (let i = 0; i <= currentStep; i++) {
        if (i === currentStep) {
          circles[i].classList.add('stroked')
          circles[i].setAttribute('stroke-width', '3')
          console.dir()
        } else {
          circles[i].classList.add('filled')
        }
      }

      const tl = new TimelineMax()

      tl.fromTo(
        svg,
        1.5,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      )
        .fromTo(
          path,
          3.5,
          {
            strokeDashoffset: length - (length / totalStep) * (currentStep - 1),
          },
          {
            strokeDashoffset: length - (length / totalStep) * currentStep,
            ease: Power1.easeInOut,
          },
          '+=0.2'
        )
        .to(
          circles[currentStep],
          1.5,
          {
            fill: '#61F984',
          },
          '-=0.5'
        )
    }
  }, [])

  const renderCircles = () => {
    const circles = []

    for (let index = 0; index < totalStep; index++) {
      circles.push(
        <circle r="20" strokeWidth="0.5" key={index} id={`circle-${index}`}>
          <animateMotion
            calcMode="linear"
            dur="0.1s"
            keyPoints={`${(1 / totalStep) * index};${(1 / totalStep) * index}`}
            keyTimes="0;1"
            repeatCount={1}
            fill="freeze"
          >
            <mpath xlinkHref="#motionPath" />
          </animateMotion>
        </circle>
      )
    }
    return circles
  }

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
        strokeMiterlimit="10"
        strokeWidth="5"
        strokeDasharray={strokeDashArray}
      />
      {renderCircles()}
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
      <BackgroundSvg className={'page-finish__background'} />
      {renderSvg()}

      <p className="page-finish__counter">
        {('0' + currentStep).slice(-2)}-{('0' + totalStep).slice(-2)}
      </p>

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
