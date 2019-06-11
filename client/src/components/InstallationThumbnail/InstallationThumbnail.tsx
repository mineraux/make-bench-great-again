import React, { FunctionComponent, useEffect, useState } from 'react'
import Classnames from 'classnames'
import './installation-thumbnail.scss'
import { Link } from 'react-router-dom'
import { InstallationStore } from '../../store'
import { getHeaderHeight } from '../../utils'
import { useWindowSize } from '../../utils/hooks'

export interface Props {
  className?: string
  installationSlug: string
  image?: string
  title: string
}

const InstallationThumbnail: FunctionComponent<Props> = ({
  className,
  installationSlug,
  image = 'https://via.placeholder.com/150',
  title,
}) => {
  const { isInstallationUnlocked, getInstallationBySlug } = InstallationStore

  const installationID = getInstallationBySlug(installationSlug)._id
  const suffixPath = isInstallationUnlocked(installationID)
    ? 'unlocked'
    : 'locked'
  const imagePath = `${
    process.env.PUBLIC_URL
  }/assets/images/installations/${installationSlug}_${suffixPath}.png`
  const windowHeight = useWindowSize().height

  return (
    <Link
      className={Classnames(className, 'installation-thumbnail')}
      to={`/installation/${installationSlug}`}
      style={{
        height: (windowHeight - getHeaderHeight()) / 3,
      }}
    >
      <div className="installation-thumbnail__ratio-wrap">
        <div className="installation-thumbnail__ratio-wrap__container">
          <p className="installation-thumbnail__ratio-wrap__container__title">
            {title}
          </p>
          <div className="installation-thumbnail__ratio-wrap__container__image">
            <img src={imagePath} alt="" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default InstallationThumbnail
