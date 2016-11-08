import { isEmpty, map } from 'lodash'
import React, { PropTypes } from 'react'
import List from 'zooid-list'

import GroupFilterListItem from '../GroupFilterListItem'

const propTypes = {
  groups: PropTypes.array,
  onUpdateGroupFilters: PropTypes.func,
  selectedGroupFilters: PropTypes.array,
}
const defaultProps = {
  groups: [],
  selectedGroupFilters: [],
}

const GroupFilterList = ({ groups, onUpdateGroupFilters, selectedGroupFilters }) => {
  if (isEmpty(groups)) return null

  const groupFilterListItems = map(groups, (group) => {
    const selected = selectedGroupFilters.includes(group)
    return (
      <GroupFilterListItem
        group={group}
        key={group.uuid}
        onUpdateGroupFilters={onUpdateGroupFilters}
        selected={selected}
      />
    )
  })

  return (
    <List>{groupFilterListItems}</List>
  )
}

GroupFilterList.propTypes    = propTypes
GroupFilterList.defaultProps = defaultProps

export default GroupFilterList
