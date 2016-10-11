import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { AppBar, AppBarPrimary, AppBarSecondary } from 'zooid-ui'
import Authenticated from './Authenticated'
import { OCTOBLU_URL, OCTOBLU_LOGO_URL } from 'config'

import 'zooid-ui/dist/style.css'

const propTypes = {
  children: PropTypes.element.isRequired,
}

export default class App extends React.Component {
  render() {
    return (
      <Authenticated>
        <AppBar>
          <AppBarPrimary>
            <a className="OctobluAppBar-link OctobluAppBar-link--logo" href={OCTOBLU_URL}>
              <img
                alt="Octoblu"
                className="OctobluAppBar-logo"
                src={OCTOBLU_LOGO_URL}
              />
            </a>

            <nav className="OctobluAppBar-nav OctobluAppBar-nav--primary" role="navigation">
              <Link to="/" className="OctobluAppBar-link">Things</Link>
            </nav>
          </AppBarPrimary>

          <AppBarSecondary>
            <Link to="/logout" className="OctobluAppBar-link">Sign out</Link>
          </AppBarSecondary>
        </AppBar>

        {this.props.children}
      </Authenticated>
    )
  }
}

App.propTypes = propTypes
