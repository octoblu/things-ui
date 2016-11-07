import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'

import {
  dismissGroupDialog,
  showGroupDialog,
} from '../../actions/groups'

const { searchRequest, searchSuccess, searchFailure } = searchActions
const initialState = {
  devices: null,
  error: null,
  fetching: false,
  showGroupDialog: false,
}

const computeSelectedGroups = ({ devices, selectedThings }) => {
  return _(devices)
    .filter(group => (_.difference(selectedThings, group.devices).length === 0))
    .map('uuid')
    .value()
}

export default createReducer({
  [dismissGroupDialog]: state => ({
    ...state,
    showGroupDialog: false,
    selectedGroups: [],
  }),
  [searchFailure]: (state, error) => ({ ...initialState, error, fetching: false }),
  [searchRequest]: () => ({ ...initialState, fetching: true }),
  [searchSuccess]: (state, devices) => {
    return {
      ...initialState,
      devices: _.filter(devices, { type: 'octoblu:group' }),
      fetching: false,
    }
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
    }
  },
}, initialState)
