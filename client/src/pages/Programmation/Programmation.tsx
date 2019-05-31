import React, {
  FunctionComponent,
  useEffect,
  useState,
  useRef,
  Fragment,
} from 'react'
import { pageProps } from '../types'
import config from '../../config/config'
// styles
import './programmation.scss'
import { useWindowSize } from '../../utils/hooks'
import InstallationStore from '../../store/InstallationStore'
import InstallationThumbnail from '../../components/InstallationThumbnail/InstallationThumbnail'
// import TweenMax = gsap.TweenMax;
import { TimelineMax, Power1, Power2 } from 'gsap'

type Props = pageProps

const Programmation: FunctionComponent<Props> = ({ match }) => {
  const ref = useRef<HTMLDivElement>(null)
  const windowHeight = useWindowSize().height

  const { installationList, fetchInstallationList } = InstallationStore
  const animationLineStagger = 0.3

  useEffect(() => {
    fetchInstallationList({ name: true, slug: true })
  }, [])

  useEffect(() => {
    if (ref.current && installationList.length > 0) {
      const installationThumbnails = ref.current.querySelectorAll(
        '.installation-thumbnail'
      )

      const tl = new TimelineMax({ delay: 0 })

      tl.staggerFromTo(
        installationThumbnails,
        1.5,
        {
          opacity: 0,
          filter: 'blur(12px)',
        },
        {
          cycle: {
            delay: (index: number) => {
              if (index % 2 === 0) {
                return (index / 2) * animationLineStagger
              } else {
                return ((index - 1) / 2) * animationLineStagger
              }
            },
          },
          opacity: 1,
          autoRound: false,
          filter: 'blur(0)',
          z: 0,
          ease: Power2.easeInOut,
        },
        0
      )
    }
  }, [installationList, ref.current])

  return (
    <div
      className={'page-programmation'}
      ref={ref}
      style={{
        minHeight: windowHeight,
      }}
    >
      {installationList.map((installation, index) => (
        <Fragment key={`${installation.slug!}`}>
          <InstallationThumbnail
            className={'page-programmation__installation-thumbnail'}
            installationSlug={installation.slug!}
            title={installation.name!}
          />
        </Fragment>
      ))}
    </div>
  )
}

export default Programmation
