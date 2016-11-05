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
  onApplicationDialogShow: PropTypes.func,
  onApplicationDialogDismiss: PropTypes.func,
  onClearSelection: PropTypes.func,
  onDeleteDialogDismiss: PropTypes.func,
  onDeleteDialogShow: PropTypes.func,
  onDeleteSelection: PropTypes.func,
  onTagSelection: PropTypes.func,
  onThingSelection: PropTypes.func,
  onUpdateTags: PropTypes.func,
  showApplicationDialog: PropTypes.bool,
  things: PropTypes.object.isRequired,
}

const defaultProps = {
  onApplicationDialogShow: _.noop,
  onApplicationDialogDismiss: _.noop,
  onClearSelection: _.noop,
  onDeleteDialogDismiss: _.noop,
  onDeleteDialogShow: _.noop,
  onDeleteSelection: _.noop,
  onTagSelection: _.noop,
  onThingSelection: _.noop,
  onUpdateTags: _.noop,
  showApplicationDialog: false,
}

const ThingsLayout = (props) => {
  const {
    onApplicationDialogDismiss,
    onApplicationDialogShow,
    onClearSelection,
    onDeleteDialogDismiss,
    onDeleteDialogShow,
    onDeleteSelection,
    onThingSelection,
    onUpdateTags,
    showApplicationDialog,
    things,
  } = props

  const {
    deletingThings,
    devices,
    error,
    fetching,
    selectedThings,
    showDeleteDialog,
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
        onApplicationDialogShow={onApplicationDialogShow}
        selectedThings={selectedThings}
      />

      <Page width="medium" className={styles.root}>
        <ThingList
          onThingSelection={onThingSelection}
          selectedThings={selectedThings}
          things={devices}
        />
      </Page>

      <TagDialog
        visible={showApplicationDialog}
        onApplicationDialogDismiss={onApplicationDialogDismiss}
        onUpdateTags={onUpdateTags}
      />

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
