import { isEmpty, map } from 'lodash'
import React, { PropTypes } from 'react'
import classnames from 'classnames/bind'
import List from 'zooid-list'
import Input from 'zooid-input'

import GroupFilterListItem from '../GroupFilterListItem'

import styles from './styles.css'

const propTypes = {
  groups: PropTypes.array,
  onFilterThings: PropTypes.func,
  onUpdateGroupFilters: PropTypes.func,
  selectedGroupFilters: PropTypes.array,
}
const defaultProps = {
  groups: [],
  selectedGroupFilters: [],
}

const GroupFilterList = ({
  onFilterThings,
  groups,
  onUpdateGroupFilters,
  selectedGroupFilters,
}) => {
  if (isEmpty(groups)) return null

  const cx = classnames.bind(styles)

  const groupFilterListItems = map(groups, (group) => {
    const selected = selectedGroupFilters.includes(group)
    const classes = cx('filter', { activeFilter: selected })
    return (
      <GroupFilterListItem
        className={classes}
        group={group}
        key={group.uuid}
        onUpdateGroupFilters={onUpdateGroupFilters}
        selected={selected}
      />
    )
  })

  return (<div className={styles.root}>
      <Input
        type="search"
        name="filterInput"
        autoFocus
        placeholder="Filter..."
        onChange={e => onFilterThings(e)}
      />
    <div className={styles.filters}>
      {groupFilterListItems}
    </div>
  </div>
  )
}

GroupFilterList.propTypes    = propTypes
GroupFilterList.defaultProps = defaultProps

export default GroupFilterList
