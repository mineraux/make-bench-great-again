import React, { FunctionComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Classnames from 'classnames'
// styles
import './nav.scss'

interface LinksInterface {
  path: string
  name: string
  inNav: boolean
}

type Props = {
  className?: string
  links: LinksInterface[]
  isOpen?: boolean
}

const Nav: FunctionComponent<Props> = ({ className, links, isOpen = true }) => {
  return (
    <nav className={Classnames('nav', { open: isOpen })}>
      {links &&
        links.map(link => {
          if (link.inNav) {
            return (
              <Fragment key={link.path}>
                <Link to={link.path}>{link.name}</Link>
              </Fragment>
            )
          }
        })}
    </nav>
  )
}

export default Nav
