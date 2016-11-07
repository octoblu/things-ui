import { noop } from 'lodash'
import React, { PropTypes } from 'react'
import { ListItem } from 'zooid-list'

import styles from './styles.css'

const propTypes = {
  group: PropTypes.object,
  onUpdateGroupDevices: PropTypes.func,
  selected: PropTypes.bool,
}

const defaultProps = {
  group: null,
  onUpdateGroupDevices: noop,
  selected: false,
}

const GroupListItem = ({ group, onUpdateGroupDevices, selected }) => {
  return (
    <ListItem className={styles.root}>
      <span>{group.name}</span>
      <input
        type="checkbox"
        checked={selected}
        onClick={() => onUpdateGroupDevices({ groupUuid: group.uuid, inGroup: selected })}
        name={group.name}
      />
    </ListItem>
  )
}

GroupListItem.propTypes    = propTypes
GroupListItem.defaultProps = defaultProps

export default GroupListItem
