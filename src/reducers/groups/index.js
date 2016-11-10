import _ from 'lodash'
import Immutable from 'immutable'
import { createReducer } from 'redux-act'
import { registerActions, searchActions } from 'redux-meshblu'

import Group from '../../models/Group'
import GroupMap from '../../models/GroupMap'

import {
  addSelectedThingsToGroup,
  removeSelectedThingsFromGroup,
  dismissGroupDialog,
  selectGroupFilters,
  removeGroupFilters,
  showGroupDialog,
  updateGroupFilter,
  updateDirtyGroupsRequest,
  updateDirtyGroupsSuccess,
  updateDirtyGroupsFailure,
} from '../../actions/groups'

const { registerRequest, registerSuccess, registerFailure } = registerActions
const { searchRequest, searchSuccess, searchFailure } = searchActions

// const initialState = {
//   creating: false,
//   creatingError: null,
//   devices: [],
//   dirtyDevices: [],
//   error: null,
//   fetching: false,
//   filterValue: '',
//   groupUpdateError: null,
//   selectedGroupFilters: [],
//   showGroupDialog: false,
//   updatingGroups: false,
// }

const initialState = new GroupMap()

const computeSelectedGroups = ({ devices, selectedThings }) => {
  return _(devices)
    .filter(group => (_.difference(selectedThings, group.devices).length === 0))
    .map('uuid')
    .value()
}

export default createReducer({
  [addSelectedThingsToGroup]: (state, { groupUuid, selectedThings }) => {
    const updatedDevices = _.map(state.devices, (group) => {
      if (group.uuid !== groupUuid) return group

      return {
        ...group,
        devices: _.union(group.devices, selectedThings),
      }
    })

    return {
      ...state,
      devices: updatedDevices,
      dirtyDevices: _.union(state.dirtyDevices, [groupUuid]),
    }
  },
  [registerRequest]: state => ({ ...state, creating: true }),
  [registerSuccess]: (state, payload) => {
    return {
      ...state,
      creating: false,
      devices: [payload, ...state.devices],
    }
  },
  [registerFailure]: (state, payload) => {
    return {
      ...state,
      creating: false,
      creatingError: payload,
    }
  },
  [dismissGroupDialog]: state => ({
    ...state,
    showGroupDialog: false,
    selectedGroups: [],
  }),
  [removeGroupFilters]: (state, group) => {
    const { selectedGroupFilters } = state
    return {
      ...state,
      selectedGroupFilters: _.pull(selectedGroupFilters, _.find(selectedGroupFilters, group)),
    }
  },
  [removeSelectedThingsFromGroup]: (state, { groupUuid, selectedThings }) => {
    const updatedDevices = _.map(state.devices, (group) => {
      if (group.uuid !== groupUuid) return group

      return {
        ...group,
        devices: _.difference(group.devices, selectedThings),
      }
    })

    return {
      ...state,
      devices: updatedDevices,
      dirtyDevices: _.union(state.dirtyDevices, [groupUuid]),
    }
  },
  [searchFailure]: (state, error) => ({ ...initialState, error, fetching: false }),
  [searchRequest]: () => initialState,
  [searchSuccess]: (state, devices) => {
    const groups = _.filter(devices, { type: 'octoblu:group' })
    return Immutable.fromJS(groups).map(group => new Group(group))

    // return {
    //   ...initialState,
    //   devices: _.filter(devices, { type: 'octoblu:group' }),
    //   fetching: false,
    // }
  },
  [dismissGroupDialog]: state => ({
    ...state,
    showGroupDialog: false,
    selectedGroups: [],
    dirtyDevices: [],
  }),
  [selectGroupFilters]: (state, group) => {
    const { selectedGroupFilters } = state
    selectedGroupFilters.push(group)
    return { ...state, selectedGroupFilters }
  },
  [showGroupDialog]: (state, selectedThings) => {
    const selectedGroups = computeSelectedGroups({
      devices: state.devices,
      selectedThings,
    })
    return {
      ...state,
      selectedGroups,
      showGroupDialog: true,
      dirtyDevices: [],
    }
  },
  [updateGroupFilter]: (state, payload) => ({ ...state, filterValue: payload }),
  [updateDirtyGroupsRequest]: state => ({ ...state, updatingGroups: true }),
  [updateDirtyGroupsSuccess]: state => ({ ...state, updatingGroups: false }),
  [updateDirtyGroupsFailure]: (state, payload) => {
    return { ...state, updatingGroups: false, groupUpdateError: payload }
  },
}, initialState)
