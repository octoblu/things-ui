import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'

import {
  addSelectedThingsToGroup,
  removeSelectedThingsFromGroup,
  dismissGroupDialog,
  showGroupDialog,
} from '../../actions/groups'

const { searchRequest, searchSuccess, searchFailure } = searchActions
const initialState = {
  devices: null,
  error: null,
  fetching: false,
  selectedGroups: [],
  showGroupDialog: false,
}

const computeSelectedGroups = ({ devices, selectedThings }) => {
  return _(devices)
    .filter(group => (_.difference(selectedThings, group.devices).length === 0))
    .map('uuid')
    .value()
}

export default createReducer({
  [addSelectedThingsToGroup]: (state, groupUuid) => {
    const updatedDevices = _.map(state.devices, (device) => {
      if (device.uuid !== groupUuid) return device
      return {
        ...device,
        devices: _.uniq([...device.devices, ...state.selectedThings]),
      }
    })

    return {
      ...state,
      devices: updatedDevices,
      selectedGroups: computeSelectedGroups({
        devices: updatedDevices,
        selectedThings: state.selectedThings,
      }),
    }
  },
  [removeSelectedThingsFromGroup]: (state, groupUuid) => {
    const updatedDevices = _.map(state.devices, (device) => {
      if (device.uuid !== groupUuid) return device
      return {
        ...device,
        devices: _.difference(device.devices, state.selectedThings),
      }
    })

    return {
      ...state,
      devices: updatedDevices,
      selectedGroups: computeSelectedGroups({
        devices: updatedDevices,
        selectedThings: state.selectedThings,
      }),
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
    }
  },
}, initialState)
