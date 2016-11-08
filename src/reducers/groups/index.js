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
  [addSelectedThingsToGroup]: (state, { groupUuid, selectedThings }) => {
    const groups = _.clone(state.devices)
    const selectedGroup = _.find(groups, { uuid: groupUuid })
    selectedGroup.devices = _.union(selectedGroup.devices, selectedThings)

    return { ...state, devices: groups }
  },
  [removeSelectedThingsFromGroup]: (state, { groupUuid, selectedThings }) => {
    const groups = _.clone(state.devices)
    const selectedGroup = _.find(groups, { uuid: groupUuid })
    selectedGroup.devices = _.difference(selectedGroup.devices, selectedThings)

    return { ...state, devices: groups }
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
    console.log('selectedGroups', selectedGroups);
    return {
      ...state,
      selectedGroups,
      showGroupDialog: true,
    }
  },
}, initialState)
