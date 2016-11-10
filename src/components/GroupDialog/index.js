import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'

import {
  dismissGroupDialog,
  removeGroupFilters,
  selectGroupFilters,
  showGroupDialog,
  updateDirtyGroups,
} from '../actions/groups'


import GroupManager from '../GroupManager'

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

  handleUpdateGroups = () => {
    const { dispatch, groups } = this.props

    dispatch(updateDirtyGroups(groups))
      .then(() => dispatch(dismissGroupDialog()))
  }

  render() {
    const { dispatch, groups } = this.props
    const { updatingGroups } = groups

    return (
      <Dialog visible={visible}>
        <DialogHeader>
          Manage Groups
        </DialogHeader>

        <DialogBody>
          <GroupManager
            onGroupDialogDismiss={() => dispatch(dismissGroupDialog())}
            onUpdateGroups={handleUpdateGroups}
            updatingGroups={updatingGroups}
          />
        </DialogBody>
      </Dialog>
    )
  }
}

GroupDialog.propTypes = propTypes

const mapStateToProps = ({ groups, things }) => {
  const { selectedThings } = things

  return { groups, selectedThings }
}

export default connect(mapStateToProps)(GroupDialog)
