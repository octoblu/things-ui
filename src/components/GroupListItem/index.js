import _ from 'lodash'
import React, { PropTypes } from 'react'
import { ListItem } from 'zooid-list'

import styles from './styles.css'

const propTypes = {
  group: PropTypes.object,
  onUpdateGroupDevices: PropTypes.func,
  selectedThings: PropTypes.array,
}

const defaultProps = {
  group: null,
  onUpdateGroupDevices: _.noop,
}

const GroupListItem = ({ group, onUpdateGroupDevices, selectedThings }) => {
  const isSelected = _.isEmpty(_.difference(selectedThings, group.devices))

  console.log('Group Devices', group.devices, 'isSelected', isSelected)

  return (
    <ListItem className={styles.root}>
      <span>{group.name}</span>
      <input
        type="checkbox"
        checked={isSelected}
        onClick={() => onUpdateGroupDevices({ groupUuid: group.uuid, inGroup: isSelected })}
        name={group.name}
      />
    </ListItem>
  )
}

GroupListItem.propTypes    = propTypes
GroupListItem.defaultProps = defaultProps

export default GroupListItem
