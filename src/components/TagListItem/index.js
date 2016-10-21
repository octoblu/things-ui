import React, { PropTypes } from 'react'
import { ListItem } from 'zooid-list'

import styles from './styles.css'

const propTypes = {
  selected: PropTypes.bool,
  tag: PropTypes.string,
}

const defaultProps = {
  selected: false,
  tag: null,
}

const TagListItem = ({ selected, tag }) => {
  return (
    <ListItem className={styles.root}>
      <span>{tag}</span>
      <input type="checkbox" defaultChecked={selected} name={tag} />
    </ListItem>
  )
}

TagListItem.propTypes    = propTypes
TagListItem.defaultProps = defaultProps

export default TagListItem
