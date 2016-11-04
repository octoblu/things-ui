import _ from 'lodash'
import React, { PropTypes } from 'react'
import List from 'zooid-list'

import TagListItem from '../TagListItem'

const propTypes = {
  applications: PropTypes.array,
  selectedApplications: PropTypes.array,
}
const defaultProps = {
  applications: [],
  selectedApplications: [],
}

const TagList = ({ selectedApplications, applications }) => {
  if (_.isEmpty(applications)) return null

  const applicationListItems = _.map(applications, (application) => {
    const selected = selectedApplications.includes(application.uuid)
    return <TagListItem application={application} key={application.uuid} selected={selected} />
  })

  return (
    <List>{applicationListItems}</List>
  )
}

TagList.propTypes    = propTypes
TagList.defaultProps = defaultProps

export default TagList
