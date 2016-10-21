import _ from 'lodash'
import React, { PropTypes } from 'react'
import List from 'zooid-list'

import TagListItem from '../TagListItem'

const propTypes = {
  tags: PropTypes.array,
  selectedTags: PropTypes.array,
}
const defaultProps = {
  tags: [],
  selectedTags: [],
}

const TagList = ({ selectedTags, tags }) => {
  if (_.isEmpty(tags)) return null

  const tagListItems = _.map(tags, (tag) => {
    const selected = selectedTags.includes(tag)
    return <TagListItem tag={tag} key={tag} selected={selected} />
  })

  return (
    <List>{tagListItems}</List>
  )
}

TagList.propTypes    = propTypes
TagList.defaultProps = defaultProps

export default TagList
