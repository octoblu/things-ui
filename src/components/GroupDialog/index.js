import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'

import GroupManager from '../GroupManager'

const propTypes = {
  visible: PropTypes.bool,
  onGroupDialogDismiss: PropTypes.func,
  onUpdateGroups: PropTypes.func,
}

const defaultProps = {
  visible: false,
  onGroupDialogDismiss: _.noop,
  onUpdateGroups: _.noop,
}

const GroupDialog = ({ visible, onGroupDialogDismiss, onUpdateGroups }) => {
  return (
    <Dialog visible={visible}>
      <DialogHeader>
        Create Group for selected Things
      </DialogHeader>

      <DialogBody>
        <GroupManager />
      </DialogBody>

      <DialogActions>
        <Button onClick={onUpdateGroups} kind="primary">Update</Button>
        <Button onClick={onGroupDialogDismiss}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

GroupDialog.propTypes    = propTypes
GroupDialog.defaultProps = defaultProps

export default GroupDialog
