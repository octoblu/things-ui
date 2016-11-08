import { isEmpty, map } from 'lodash'
import React, { PropTypes } from 'react'
import List from 'zooid-list'

import GroupListItem from '../GroupListItem'

const propTypes = {
  groups: PropTypes.array,
  onUpdateGroupDevices: PropTypes.func,
  selectedGroups: PropTypes.array,
}
const defaultProps = {
  groups: [],
  selectedGroups: [],
}

const GroupList = ({ groups, onUpdateGroupDevices, selectedGroups }) => {
  if (isEmpty(groups)) return null

  const groupListItems = map(groups, (group) => {
    console.log(selectedGroups, group.uuid);
    
    const selected = selectedGroups.includes(group.uuid)
    console.log('SELECTED', selected);

    return (
      <GroupListItem
        group={group}
        key={group.uuid}
        onUpdateGroupDevices={onUpdateGroupDevices}
        selected={selected}
      />
    )
  })

  return (
    <List>{groupListItems}</List>
  )
}

GroupList.propTypes    = propTypes
GroupList.defaultProps = defaultProps

export default GroupList
