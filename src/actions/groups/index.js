import _ from 'lodash'
import { createAction } from 'redux-act'
import { update } from 'redux-meshblu'
import Promise from 'bluebird'


import { getMeshbluConfig } from '../../services/auth-service'

const addSelectedThingsToGroup      = createAction('/groups/add/things')
const removeSelectedThingsFromGroup = createAction('/groups/remove/things')
const dismissGroupDialog            = createAction('/groups/dismiss/dialog')
const showGroupDialog               = createAction('/groups/show/dialog')
const updateDirtyGroupsRequest      = createAction('/groups/update/dirty/request')
const updateDirtyGroupsSuccess      = createAction('/groups/update/dirty/success')
const updateDirtyGroupsFailure      = createAction('/groups/update/dirty/failure')
const removeGroupFilters            = createAction('/groups/remove/filter')
const selectGroupFilters            = createAction('/groups/add/filter')

const updateDirtyGroups = (groups) => {
  return (dispatch) => {
    const meshbluConfig = getMeshbluConfig()
    dispatch(updateDirtyGroupsRequest())

    const groupsToUpdate = _.filter(groups.devices, (device) => {
      return _.includes(groups.dirtyDevices, device.uuid)
    })

    return Promise.each(groupsToUpdate, (group) => {
      return dispatch(update({ body: group, uuid: group.uuid, meshbluConfig }))
    })
    .then(() => dispatch(updateDirtyGroupsSuccess()))
    .catch(err => dispatch(updateDirtyGroupsFailure(err)))
  }
}

export {
  addSelectedThingsToGroup,
  removeSelectedThingsFromGroup,
  dismissGroupDialog,
  selectGroupFilters,
  removeGroupFilters,
  showGroupDialog,
  updateDirtyGroups,
  updateDirtyGroupsRequest,
  updateDirtyGroupsFailure,
  updateDirtyGroupsSuccess,
}
