import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'

import {
  addSelectedThingsToGroup,
  removeSelectedThingsFromGroup,
  dismissGroupDialog,
  showGroupDialog,
  updateDirtyGroupsRequest,
  updateDirtyGroupsSuccess,
  updateDirtyGroupsFailure,
} from '../../actions/groups'

const { searchRequest, searchSuccess, searchFailure } = searchActions
const initialState = {
  devices: null,
  dirtyDevices: [],
  error: null,
  fetching: false,
  groupUpdateError: null,
  showGroupDialog: false,
  updatingGroups: false,
}

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
  [searchRequest]: () => ({ ...initialState, fetching: true }),
  [searchSuccess]: (state, devices) => {
    return {
      ...initialState,
      devices: _.filter(devices, { type: 'octoblu:group' }),
      fetching: false,
    }
  },
  [dismissGroupDialog]: state => ({
    ...state,
    showGroupDialog: false,
    selectedGroups: [],
    dirtyDevices: [],
  }),
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
  [updateDirtyGroupsRequest]: state => ({ ...state, updatingGroups: true }),
  [updateDirtyGroupsSuccess]: state => ({ ...state, updatingGroups: false }),
  [updateDirtyGroupsFailure]: (state, payload) => {
    return { ...state, updatingGroups: false, groupUpdateError: payload }
  },
}, initialState)
