import _ from 'lodash'
import React, { PropTypes } from 'react'
import Page from 'zooid-page'

import DeleteDialog from '../DeleteDialog'
import GroupDialog from '../GroupDialog'
import GroupFilterList from '../GroupFilterList'
import ThingList from '../ThingList'
import ThingListActions from '../ThingListActions'
import ThingsPageHeader from '../ThingsPageHeader'

import styles from './styles.css'

const propTypes = {
  groups: PropTypes.object,
  onGroupDialogShow: PropTypes.func,
  onGroupDialogDismiss: PropTypes.func,
  onClearSelection: PropTypes.func,
  onDeleteDialogDismiss: PropTypes.func,
  onDeleteDialogShow: PropTypes.func,
  onDeleteSelection: PropTypes.func,
  onFilterThings: PropTypes.func,
  onThingSelection: PropTypes.func,
  onUpdateGroupFilters: PropTypes.func,
  onUpdateGroups: PropTypes.func,
  showGroupDialog: PropTypes.bool,
  things: PropTypes.object.isRequired,
}

const defaultProps = {
  onGroupDialogShow: _.noop,
  onGroupDialogDismiss: _.noop,
  onClearSelection: _.noop,
  onDeleteDialogDismiss: _.noop,
  onDeleteDialogShow: _.noop,
  onDeleteSelection: _.noop,
  onFilterThings: _.noop,
  onThingSelection: _.noop,
  onUpdateGroupFilters: _.noop,
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
    onFilterThings,
    onThingSelection,
    onUpdateGroupFilters,
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
    thingFilter,
  } = things

  const { selectedGroupFilters, updatingGroups } = groups

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const filterThingsByString = () => {
    if (_.isEmpty(thingFilter)) return devices

    const filteredDevices = _.filter(devices, (device) => {
      const matchesName = device.name.indexOf(thingFilter) !== -1
      const matchesUuid = device.uuid.indexOf(thingFilter) !== -1


      if (device.name && matchesName) return matchesName

      return matchesUuid
    })
    return filteredDevices
  }

  const filterThingsByGroups = () => {
    if (_.isEmpty(selectedGroupFilters)) return devices
    const filteredDevices = []
    const thingsInGroups = _.uniq(_.flatMap(selectedGroupFilters, 'devices'))
    _.each(thingsInGroups, (uuid) => { filteredDevices.push(_.find(devices, { uuid })) })
    return filteredDevices
  }

  const updatedDevices = filterThingsByString(filterThingsByGroups(devices))

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
          things={updatedDevices}
          groups={groups.devices}
        />
        <GroupFilterList
          onFilterThings={onFilterThings}
          groups={groups.devices}
          onUpdateGroupFilters={onUpdateGroupFilters}
          selectedGroupFilters={selectedGroupFilters}
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
