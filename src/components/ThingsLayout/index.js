import _ from 'lodash'
import React, { PropTypes } from 'react'
import Page from 'zooid-page'

import DeleteDialog from '../DeleteDialog'
import TagDialog from '../TagDialog'
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
  onTagDialogShow: PropTypes.func,
  onTagDialogDismiss: PropTypes.func,
  onThingSelection: PropTypes.func,
  things: PropTypes.object.isRequired,
}

const defaultProps = {
  onClearSelection: _.noop,
  onDeleteDialogDismiss: _.noop,
  onDeleteDialogShow: _.noop,
  onDeleteSelection: _.noop,
  onTagDialogShow: _.noop,
  onTagDialogDismiss: _.noop,
  onTagSelection: _.noop,
  onThingSelection: _.noop,
}

const ThingsLayout = (props) => {
  const {
    onClearSelection,
    onDeleteDialogDismiss,
    onDeleteDialogShow,
    onDeleteSelection,
    onTagDialogDismiss,
    onTagDialogShow,
    onThingSelection,
    things,
  } = props

  const {
    deletingThings,
    devices,
    error,
    fetching,
    selectedThings,
    showDeleteDialog,
    showTagDialog,
  } = things

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (_.isEmpty(devices)) return <div>No Things Found</div>

  return (
    <div>
      <ThingsPageHeader />

      <ThingListActions
        onClearSelection={onClearSelection}
        onDeleteDialogShow={onDeleteDialogShow}
        onTagDialogShow={onTagDialogShow}
        selectedThings={selectedThings}
      />

      <Page width="medium" className={styles.root}>
        <ThingList
          onThingSelection={onThingSelection}
          selectedThings={selectedThings}
          things={devices}
        />
      </Page>

      <TagDialog visible={showTagDialog} onTagDialogDismiss={onTagDialogDismiss} />

      <DeleteDialog
        deletingThings={deletingThings}
        onDeleteSelection={onDeleteSelection}
        onDeleteDialogDismiss={onDeleteDialogDismiss}
        selectedThings={selectedThings}
        visible={showDeleteDialog}
      />
    </div>
  )
}

ThingsLayout.propTypes    = propTypes
ThingsLayout.defaultProps = defaultProps

export default ThingsLayout
