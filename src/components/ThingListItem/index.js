import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DeviceImage from 'zooid-device-icon'

import ThingName from '../ThingName'

import styles from './styles.css'

const propTypes = {
  onThingSelection: PropTypes.func,
  selected: PropTypes.bool,
  thing: PropTypes.object,
}

const defaultProps = {
  onThingSelection: _.noop,
  selected: false,
  thing: null,
}


const ThingListItem = ({ onThingSelection, selected, thing }) => {
  if (_.isEmpty(thing)) return null
  if (_.isEmpty(thing.uuid)) return null

  const { uuid, logo, type } = thing

  return (
    <div className={styles.root}>
      <input
        type="checkbox"
        className={styles.checkbox}
        name={uuid}
        checked={selected}
        onChange={({ target }) => onThingSelection(target.name, target.checked)}
      />

      <div className={styles.logoWrapper}>
        <DeviceImage type={type} logo={logo} className={styles.logo} />
      </div>

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
