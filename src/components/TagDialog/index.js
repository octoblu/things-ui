import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'

import TagManager from '../TagManager'

const propTypes = {
  visible: PropTypes.bool,
  onApplicationDialogDismiss: PropTypes.func,
  onUpdateTags: PropTypes.func,
}

const defaultProps = {
  visible: false,
  onApplicationDialogDismiss: _.noop,
  onUpdateTags: _.noop,
}

const TagDialog = ({ visible, onApplicationDialogDismiss, onUpdateTags }) => {
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
        <Button onClick={onApplicationDialogDismiss}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

TagDialog.propTypes    = propTypes
TagDialog.defaultProps = defaultProps

export default TagDialog
