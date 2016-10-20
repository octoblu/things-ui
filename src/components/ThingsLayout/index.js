import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Dialog, { DialogActions, DialogBody, DialogHeader } from 'zooid-dialog'
import Page from 'zooid-page'

import ThingList from '../ThingList'
import ThingListActions from '../ThingListActions'
import ThingsPageHeader from '../ThingsPageHeader'

import styles from './styles.css'

const propTypes = {
  onClearSelection: PropTypes.func,
  onDeleteDialogDismiss: PropTypes.func,
  onDeleteDialogShow: PropTypes.func,
  onDeleteSelection: PropTypes.func,
  onTagSelection: PropTypes.func,
  onThingSelection: PropTypes.func,
  things: PropTypes.object.isRequired,
}

const defaultProps = {
  onClearSelection: _.noop,
  onDeleteDialogDismiss: _.noop,
  onDeleteDialogShow: _.noop,
  onDeleteSelection: _.noop,
  onTagSelection: _.noop,
  onThingSelection: _.noop,
}

const ThingsLayout = (props) => {
  const {
    onClearSelection,
    onDeleteDialogDismiss,
    onDeleteDialogShow,
    onDeleteSelection,
    onTagSelection,
    onThingSelection,
    things,
  } = props

  const { devices, error, fetching, selectedThings, showDeleteDialog } = things

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (_.isEmpty(devices)) return <div>No Things Found</div>

  return (
    <div>
      <ThingsPageHeader />

      <ThingListActions
        onClearSelection={onClearSelection}
        onDeleteDialogShow={onDeleteDialogShow}
        onTagSelection={onTagSelection}
        selectedThings={selectedThings}
      />

      <Page width="medium" className={styles.root}>
        <ThingList
          onThingSelection={onThingSelection}
          selectedThings={selectedThings}
          things={devices}
        />
      </Page>

      <Dialog visible={showDeleteDialog}>
        <DialogHeader>Are you sure?</DialogHeader>
        <DialogBody>Permanently delete x things? You can't undo this action.</DialogBody>
        <DialogActions>
          <Button kind="danger" onClick={onDeleteSelection}>Delete</Button>
          <Button onClick={onDeleteDialogDismiss}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

ThingsLayout.propTypes    = propTypes
ThingsLayout.defaultProps = defaultProps

export default ThingsLayout
