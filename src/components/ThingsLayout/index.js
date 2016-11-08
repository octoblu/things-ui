import _ from 'lodash'
import React, { PropTypes } from 'react'
import Page from 'zooid-page'

import DeleteDialog from '../DeleteDialog'
import GroupDialog from '../GroupDialog'
import ThingList from '../ThingList'
import ThingListActions from '../ThingListActions'
import ThingsPageHeader from '../ThingsPageHeader'

import styles from './styles.css'

const propTypes = {
  onGroupDialogShow: PropTypes.func,
  onGroupDialogDismiss: PropTypes.func,
  onClearSelection: PropTypes.func,
  onDeleteDialogDismiss: PropTypes.func,
  onDeleteDialogShow: PropTypes.func,
  onDeleteSelection: PropTypes.func,
  onGroupSelection: PropTypes.func,
  onThingSelection: PropTypes.func,
  onUpdateGroups: PropTypes.func,
  showGroupDialog: PropTypes.bool,
  things: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequired,
}

const defaultProps = {
  onGroupDialogShow: _.noop,
  onGroupDialogDismiss: _.noop,
  onClearSelection: _.noop,
  onDeleteDialogDismiss: _.noop,
  onDeleteDialogShow: _.noop,
  onDeleteSelection: _.noop,
  onGroupSelection: _.noop,
  onThingSelection: _.noop,
  onUpdateGroups: _.noop,
  showGroupDialog: false,
}

const ThingsLayout = (props) => {
  const {
    groups,
    onGroupDialogDismiss,
    onGroupDialogShow,
    onClearSelection,
    onDeleteDialogDismiss,
    onDeleteDialogShow,
    onDeleteSelection,
    onThingSelection,
    onUpdateGroups,
    showGroupDialog,
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

  const { updatingGroups } = groups

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (_.isEmpty(devices)) return <div>No Things Found</div>

  return (
    <div>
      <ThingsPageHeader />

      <ThingListActions
        onClearSelection={onClearSelection}
        onDeleteDialogShow={onDeleteDialogShow}
        onGroupDialogShow={onGroupDialogShow}
        selectedThings={selectedThings}
      />

      <Page width="medium" className={styles.root}>
        <ThingList
          onThingSelection={onThingSelection}
          selectedThings={selectedThings}
          things={devices}
        />
      </Page>

      <GroupDialog
        onGroupDialogDismiss={onGroupDialogDismiss}
        onUpdateGroups={onUpdateGroups}
        updatingGroups={updatingGroups}
        visible={showGroupDialog}
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
