import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'

import GroupManager from '../GroupManager'

const propTypes = {
  onGroupDialogDismiss: PropTypes.func,
  onUpdateGroups: PropTypes.func,
  updatingGroups: PropTypes.bool,
  visible: PropTypes.bool,
}

const defaultProps = {
  onGroupDialogDismiss: _.noop,
  onUpdateGroups: _.noop,
  updatingGroups: false,
  visible: false,
}

const GroupDialog = ({ onGroupDialogDismiss, onUpdateGroups, updatingGroups, visible }) => {
  return (
    <Dialog visible={visible}>
      <DialogHeader>
        Create Group for selected Things
      </DialogHeader>

      <DialogBody>
        <GroupManager />
      </DialogBody>

      <DialogActions>
        <Button onClick={onUpdateGroups} kind="primary" disabled={updatingGroups}>Update</Button>
        <Button onClick={onGroupDialogDismiss}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

GroupDialog.propTypes    = propTypes
GroupDialog.defaultProps = defaultProps

export default GroupDialog
