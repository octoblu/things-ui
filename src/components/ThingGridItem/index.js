import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DeviceImage from 'zooid-device-icon'

import styles from './styles.css'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

const ThingGridItem = ({ thing }) => {
  if (_.isEmpty(thing)) return null
  if (_.isEmpty(thing.uuid)) return null

  const { name, uuid, logo, type } = thing

  let thingLogo = <img src={logo} alt={name} className={styles.logo} />
  if (!logo) {
    thingLogo = <DeviceImage type={type} className={styles.logo} />
  }

  return (
    <Link to={`/things/${uuid}`} className={styles.root}>
      <div className={styles.logoWrapper}>{thingLogo}</div>
      <div className={styles.name}>{name || 'no-name'}</div>
    </Link>
  )
}

ThingGridItem.propTypes    = propTypes
ThingGridItem.defaultProps = defaultProps

export default ThingGridItem
