import { isEmpty, map } from 'lodash'
import React, { PropTypes } from 'react'
import List from 'zooid-list'

import TagListItem from '../TagListItem'

const propTypes = {
  applications: PropTypes.array,
  onUpdateApplicationDevices: PropTypes.func,
  selectedApplications: PropTypes.array,
}
const defaultProps = {
  applications: [],
  selectedApplications: [],
}

const TagList = ({ applications, onUpdateApplicationDevices, selectedApplications }) => {
  if (isEmpty(applications)) return null

  const applicationListItems = map(applications, (application) => {
    const selected = selectedApplications.includes(application.uuid)
    return (
      <TagListItem
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

TagList.propTypes    = propTypes
TagList.defaultProps = defaultProps

export default TagList
