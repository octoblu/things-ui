import _ from 'lodash'
import React, { PropTypes } from 'react'
import { ListItem } from 'zooid-list'
import MdLabel from 'react-icons/lib/md/label'

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

  return (
    <ListItem className={styles.root}>
      <div>
        <MdLabel />
        <span className={styles.groupName}>{group.name}</span>
      </div>

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
