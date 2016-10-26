import _ from 'lodash'
import React, { PropTypes } from 'react'
import pluralize from 'pluralize'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'

const propTypes = {
  deletingThings: PropTypes.bool,
  onDeleteDialogDismiss: PropTypes.func,
  onDeleteSelection: PropTypes.func,
  selectedThings: PropTypes.array,
  visible: PropTypes.bool,
}

const defaultProps = {
  deletingThings: false,
  onDeleteDialogDismiss: _.noop,
  onDeleteSelection: _.noop,
  selectedThings: [],
  visible: false,
}

const DeleteDialog = ({ deletingThings, onDeleteDialogDismiss, onDeleteSelection, selectedThings, visible }) => {
  const selectedThingsCount = _.size(selectedThings)

  return (
    <Dialog visible={visible}>
      <DialogHeader>Are you sure?</DialogHeader>
      <DialogBody>Permanently delete {pluralize('Thing', selectedThingsCount, true)}? You can't undo this action.</DialogBody>
      <DialogActions>
        <Button kind="danger" onClick={onDeleteSelection} disabled={deletingThings}>
          {(deletingThings) ? 'Deleting...' : 'Delete'}
        </Button>
        <Button onClick={onDeleteDialogDismiss}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes    = propTypes
DeleteDialog.defaultProps = defaultProps

export default DeleteDialog
