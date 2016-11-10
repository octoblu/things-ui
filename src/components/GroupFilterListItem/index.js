import { noop } from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'

const propTypes = {
  className: PropTypes.string,
  group: PropTypes.object,
  onUpdateGroupFilters: PropTypes.func,
  selected: PropTypes.bool,
}

const defaultProps = {
  className: '',
  group: null,
  onUpdateGroupFilters: noop,
  selected: false,
}

const GroupFilterListItem = ({ className, group, onUpdateGroupFilters, selected }) => {
  return (<Button
    className={className}
    block
    kind="no-style"
    onClick={() => onUpdateGroupFilters({ group, selected })}
  >
    {group.name}
  </Button>)
}

GroupFilterListItem.propTypes    = propTypes
GroupFilterListItem.defaultProps = defaultProps

export default GroupFilterListItem
