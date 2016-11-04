import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'

import TagManager from '../TagManager'

const propTypes = {
  visible: PropTypes.bool,
  onTagDialogDismiss: PropTypes.func,
  onUpdateTags: PropTypes.func,
}

const defaultProps = {
  visible: false,
  onTagDialogDismiss: _.noop,
  onUpdateTags: _.noop,
}

const TagDialog = ({ visible, onTagDialogDismiss, onUpdateTags }) => {
  return (
    <Dialog visible={visible}>
      <DialogHeader>
        Create Tag for selected Things
      </DialogHeader>

      <DialogBody>
        <TagManager />
      </DialogBody>

      <DialogActions>
        <Button onClick={onUpdateTags} kind="primary">Update</Button>
        <Button onClick={onTagDialogDismiss}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

TagDialog.propTypes    = propTypes
TagDialog.defaultProps = defaultProps

export default TagDialog
