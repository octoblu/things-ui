import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DeviceImage from 'zooid-device-icon'

import ThingName from '../ThingName'

import styles from './styles.css'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

const ThingListItem = ({ thing }) => {
  if (_.isEmpty(thing)) return null
  if (_.isEmpty(thing.uuid)) return null

  const { name, uuid, logo, type } = thing

  let thingLogo = <img src={logo} alt={name} className={styles.logo} />
  if (!logo) {
    thingLogo = <DeviceImage type={type} className={styles.logo} />
  }

  return (
    <div className={styles.root}>
      <input type="checkbox" className={styles.checkbox} />
      <div className={styles.logoWrapper}>{thingLogo}</div>
      <div className={styles.body}>
        <Link to={`/things/${uuid}`} className={styles.name}>
          <ThingName thing={thing} />
        </Link>
        <div><span className={styles.tag}>Tag #1</span></div>
      </div>
    </div>
  )
}

ThingListItem.propTypes    = propTypes
ThingListItem.defaultProps = defaultProps

export default ThingListItem
