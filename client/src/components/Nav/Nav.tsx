import React, { FunctionComponent, Fragment} from 'react'
import { observer } from 'mobx-react-lite'
import {Link} from "react-router-dom"

import './nav.scss'

interface LinksInterface {
  link: string,
  label: string
}

type Props = {
  links: LinksInterface[],
}

const Nav: FunctionComponent<Props> = ({links}) => {

    return (
      <nav className="nav">
        {links && links.map(link => (
          <Fragment key={link.link}>
            <Link to={link.link}>{link.label}</Link>
          </Fragment>
          ))}
      </nav>

    )
}

export default observer(Nav)