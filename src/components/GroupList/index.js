import { isEmpty, map } from 'lodash'
import React, { PropTypes } from 'react'
import List from 'zooid-list'

import GroupListItem from '../GroupListItem'

const propTypes = {
  groups: PropTypes.array,
  onUpdateGroupDevices: PropTypes.func,
  selectedThings: PropTypes.array,
}

const defaultProps = {
  groups: [],
}

const GroupList = ({ groups, onUpdateGroupDevices, selectedThings }) => {
  if (isEmpty(groups)) return null

  const groupListItems = map(groups, (group) => {
    return (
      <GroupListItem
        group={group}
        key={group.uuid}
        selectedThings={selectedThings}
        onUpdateGroupDevices={onUpdateGroupDevices}
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
