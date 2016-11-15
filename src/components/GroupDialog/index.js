import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { register } from 'redux-meshblu'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'

import {
  dismissGroupDialog,
  removeGroupFilters,
  selectGroupFilters,
  showGroupDialog,
  updateDirtyGroups,
  updateGroupFilter,
} from '../../actions/groups'

import { getMeshbluConfig } from '../../services/auth-service'

import GroupManager from '../GroupManager'
import GroupManagerEmptyState from '../GroupManagerEmptyState'


// const propTypes = {
//   onGroupDialogDismiss: PropTypes.func,
//   onUpdateGroups: PropTypes.func,
//   updatingGroups: PropTypes.bool,
//   visible: PropTypes.bool,
// }
//
// const defaultProps = {
//   onGroupDialogDismiss: _.noop,
//   onUpdateGroups: _.noop,
//   updatingGroups: false,
//   visible: false,
// }

const propTypes = {
  dispatch: PropTypes.func,
  groups: PropTypes.object,
  selectedThings: PropTypes.array,
}

class GroupDialog extends React.Component {
  handleCreateGroup = () => {
    const { dispatch, groups, selectedThings } = this.props
    const meshbluConfig = getMeshbluConfig()
    const ownerUuid = meshbluConfig.uuid
    const body = {
      description: '',
      devices: selectedThings,
      name: groups.filterValue,
      owner: ownerUuid,
      type: 'octoblu:group',
      meshblu: {
        whitelists: {
          configure: {
            update: [{ uuid: ownerUuid }],
          },
          discover: {
            view: [{ uuid: ownerUuid }],
          },
        },
      },
    }

    console.log('{ body, meshbluConfig }', { body, meshbluConfig });
    return dispatch(register({ body, meshbluConfig }))
  }

  handleUpdateGroups = () => {
    const { dispatch, groups } = this.props

    dispatch(updateDirtyGroups(groups))
      .then(() => dispatch(dismissGroupDialog()))
  }

  handleUpdateGroupFilter = (filterValue) => {
    this.props.dispatch(updateGroupFilter(filterValue))
  }

  render() {
    const { dispatch, groups } = this.props
    const { creating, devices, filterValue, showGroupDialog, updatingGroups } = groups

    let dialogBody = (
      <GroupManager
        creating={creating}
        filterValue={filterValue}
        onCreateGroup={this.handleCreateGroup}
        onUpdateGroup={this.handleUpdateGroups}
        updateGroupFilter={this.handleUpdateGroupFilter}
      />}
    )

    if (_.isEmpty(devices)) dialogBody = (
      <GroupManagerEmptyState
        creating={creating}
        filterValue={filterValue}
        onCreateGroup={this.handleCreateGroup}
        updateGroupFilter={this.handleUpdateGroupFilter}
      />
    )

    return (
      <Dialog visible={showGroupDialog}>
        <DialogHeader>
          Manage Groups
        </DialogHeader>

        <DialogBody>{dialogBody}</DialogBody>
      </Dialog>
    )
  }
}

GroupDialog.propTypes = propTypes

const mapStateToProps = ({ groups, things, dispatch }) => {
  const { selectedThings } = things

  return { groups, selectedThings, dispatch }
}

export default connect(mapStateToProps)(GroupDialog)
