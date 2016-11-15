import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Input from 'zooid-input'

const propTypes = {
  creating: PropTypes.bool,
  filterValue: PropTypes.string,
  onCreateGroup: PropTypes.func,
  updateGroupFilter: PropTypes.func,
}

const GroupManagerEmptyState = ({ creating, filterValue, onCreateGroup, updateGroupFilter }) => {
  return (
    <div>
      <p>You have no Groups yet.</p>
      <Input
        placeholder="Group Name"
        value={filterValue}
        onChange={({ target }) => updateGroupFilter(target.value)}
      />

      <Button
        block
        disabled={creating}
        kind="primary"
        onClick={onCreateGroup}
      >
        Create Group
      </Button>
    </div>
  )
}

GroupManagerEmptyState.propTypes = propTypes

export default GroupManagerEmptyState
