import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { AppBar, AppBarPrimary } from 'zooid-ui'
import 'zooid-ui/dist/style.css'

import styles from './styles.css'

const propTypes = {
  children: PropTypes.node,
}

const defaultProps = {}

const Main = ({ children }) => {
  return (
    <div>
      <AppBar >
        <AppBarPrimary className={styles.appBarPrimary}>
          <Link to="/" className={styles.appBarPrimaryLink}>Thing</Link>
        </AppBarPrimary>
      </AppBar>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

Main.propTypes    = propTypes
Main.defaultProps = defaultProps

export default Main
