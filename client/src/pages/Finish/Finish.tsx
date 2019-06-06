import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
import Button, { themes as buttonThemes } from '../../components/Button/Button'
import { ReactComponent as BackgroundSvg } from './background.svg'
// styles
import './finish.scss'
import { useWindowSize } from '../../utils/hooks'
import { TimelineMax, Power1 } from 'gsap'
import { observer } from 'mobx-react-lite'
import { InstallationStore } from '../../store'

type Props = pageProps

const Finish: FunctionComponent<Props> = ({ match }) => {
  const ref = useRef<HTMLDivElement>(null)
  const windowHeight = useWindowSize().height
  const [strokeDashArray, setStrokeDashArray] = useState(0)

  // const currentStep = 3
  // const totalStep = 5
  const {
    installationList,
    fetchInstallationList,
    unlockedInstallations,
  } = InstallationStore
  const currentStep = unlockedInstallations.length
  const totalStep = installationList.length

  useEffect(() => {
    const getInstallationList = () => {
      fetchInstallationList({
        slug: true,
        name: true,
        description: true,
        geolocation: true,
      })
    }

    getInstallationList()
  }, [])

  const wording = {
    0: "Il semblerait que tu n'aies pas encore signé de pétition.",
    1: 'C’est un bon début ! Tu as relevé le premier défi, pour signer d’autres pétitions, rends-toi à la prochaine oeuvre !',
    2: 'Merci ! Maintenant que tu en sais un peu plus sur le mobilier anti-sdf, poursuis ton engagement !',
    3: 'Très bien ! Tu as réalisé plus de la moitié du parcours. Plus que deux oeuvres à découvrir ! ',
    4: 'Bravo ! Tu as dû faire preuve d’agilité pour ce défi. Pour découvrir la dernière oeuvre, suis l’itinéraire.',
    5: 'Félicitations, tu as signé toutes les pétitions ! Grâce à tes performances, nous espérons retirer ces dispositifs pour lutter contre le design hostile.',
  }

  useEffect(() => {
    if (ref.current && totalStep > 0) {
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
  }, [installationList.length])

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

  const getWording = (): string => {
    let string = ''

    if (currentStep === 0) {
      string = wording[0]
    } else if (currentStep === 1) {
      string = wording[1]
    } else if (currentStep === Math.floor(totalStep / 2)) {
      string = wording[3]
    } else if (currentStep === totalStep - 1) {
      string = wording[4]
    } else if (currentStep === totalStep) {
      string = wording[5]
    } else {
      string = wording[2]
    }

    return string
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

      <p className="page-finish__text">{getWording()}</p>

      <Button
        className={'page-finish__button'}
        label={'Retour à la map'}
        theme={buttonThemes.Green}
        link={config.routes.Map.path}
      />
    </div>
  )
}

export default observer(Finish)
