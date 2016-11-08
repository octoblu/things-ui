import { noop } from 'lodash'
import React, { PropTypes } from 'react'
import { ListItem } from 'zooid-list'

import styles from './styles.css'

const propTypes = {
  group: PropTypes.object,
  onUpdateGroupFilters: PropTypes.func,
  selected: PropTypes.bool,
}

const defaultProps = {
  group: null,
  onUpdateGroupFilters: noop,
  selected: false,
}

const GroupFilterListItem = ({ group, onUpdateGroupFilters, selected }) => {
  return (
    <ListItem className={styles.root}>
      <span>{group.name}</span>
      <input
        type="checkbox"
        checked={selected}
        onClick={() => onUpdateGroupFilters({ group, selected })}
        name={group.name}
      />
    </ListItem>
  )
}

GroupFilterListItem.propTypes    = propTypes
GroupFilterListItem.defaultProps = defaultProps

export default GroupFilterListItem
