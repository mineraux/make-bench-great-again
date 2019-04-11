import React, { FunctionComponent, Fragment} from 'react'
import { observer } from 'mobx-react-lite'
import {Link} from "react-router-dom"

import './nav.scss'

export interface LinksInterface {
  path: string,
  name: string
}

type Props = {
  links: LinksInterface[],
}

const Nav: FunctionComponent<Props> = ({links}) => {

    return (
      <nav className="nav">
        {links && links.map(link => (
          <Fragment key={link.path}>
            <Link to={link.path}>{link.name}</Link>
          </Fragment>
          ))}
      </nav>

    )
}

export default observer(Nav)