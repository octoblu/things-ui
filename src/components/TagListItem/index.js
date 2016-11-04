import React, { PropTypes } from 'react'
import { ListItem } from 'zooid-list'

import styles from './styles.css'

const propTypes = {
  selected: PropTypes.bool,
  application: PropTypes.object,
}

const defaultProps = {
  selected: false,
  application: null,
}

const TagListItem = ({ selected, application }) => {
  return (
    <ListItem className={styles.root}>
      <span>{application.name}</span>
      <input type="checkbox" defaultChecked={selected} name={application.name} />
    </ListItem>
  )
}

TagListItem.propTypes    = propTypes
TagListItem.defaultProps = defaultProps

export default TagListItem
