import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'
import Input from 'zooid-input'

const propTypes = {
  visible: PropTypes.bool,
  onTagSelection: PropTypes.func,
  onTagDialogDismiss: PropTypes.func,
}

const defaultProps = {
  visible: false,
  onTagSelection: _.noop,
  onTagDialogDismiss: _.noop,
}

const TagDialog = ({ visible, onTagSelection, onTagDialogDismiss }) => {
  return (
    <Dialog visible={visible}>
      <DialogHeader>Create Tag for selected Things</DialogHeader>
      <DialogBody>
        <Input name="tagName" label="Tag Name" />
      </DialogBody>
      <DialogActions>
        <Button kind="primary" onClick={onTagSelection}>Create</Button>
        <Button onClick={onTagDialogDismiss}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

TagDialog.propTypes    = propTypes
TagDialog.defaultProps = defaultProps

export default TagDialog
