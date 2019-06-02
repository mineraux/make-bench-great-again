import React, { FunctionComponent, useEffect, useState } from 'react'
import Classnames from 'classnames'
import './installation-thumbnail.scss'
import { Link } from 'react-router-dom'
import config from '../../config/config'

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
  return (
    <Link
      className={Classnames(className, 'installation-thumbnail')}
      to={`/installation/${installationSlug}`}
    >
      <div className="installation-thumbnail__ratio-wrap">
        <div className="installation-thumbnail__ratio-wrap__container">
          <p className="installation-thumbnail__ratio-wrap__container__title">
            {title}
          </p>
          <div className="installation-thumbnail__ratio-wrap__container__image">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default InstallationThumbnail
