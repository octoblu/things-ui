import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'

const propTypes = {
  visible: PropTypes.bool,
  onDeleteSelection: PropTypes.func,
  onDeleteDialogDismiss: PropTypes.func,
}

const defaultProps = {
  visible: false,
  onDeleteSelection: _.noop,
  onDeleteDialogDismiss: _.noop,
}

const DeleteDialog = ({ visible, onDeleteSelection, onDeleteDialogDismiss }) => {
  return (
    <Dialog visible={visible}>
      <DialogHeader>Are you sure?</DialogHeader>
      <DialogBody>Permanently delete x things? You can't undo this action.</DialogBody>
      <DialogActions>
        <Button kind="danger" onClick={onDeleteSelection}>Delete</Button>
        <Button onClick={onDeleteDialogDismiss}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes    = propTypes
DeleteDialog.defaultProps = defaultProps

export default DeleteDialog
