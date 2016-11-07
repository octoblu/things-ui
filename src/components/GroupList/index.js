import { isEmpty, map } from 'lodash'
import React, { PropTypes } from 'react'
import List from 'zooid-list'

import GroupListItem from '../GroupListItem'

const propTypes = {
  groups: PropTypes.array,
  onUpdateApplicationDevices: PropTypes.func,
  selectedGroups: PropTypes.array,
}
const defaultProps = {
  groups: [],
  selectedGroups: [],
}

const GroupList = ({ groups, onUpdateApplicationDevices, selectedGroups }) => {
  if (isEmpty(groups)) return null

  const applicationListItems = map(groups, (application) => {
    const selected = selectedGroups.includes(application.uuid)
    return (
      <GroupListItem
        application={application}
        key={application.uuid}
        onUpdateApplicationDevices={onUpdateApplicationDevices}
        selected={selected}
      />
    )
  })

  return (
    <List>{applicationListItems}</List>
  )
}

GroupList.propTypes    = propTypes
GroupList.defaultProps = defaultProps

export default GroupList
