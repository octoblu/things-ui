import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'

import {
  dismissApplicationDialog,
  showApplicationDialog,
} from '../../actions/applications'

const { searchRequest, searchSuccess, searchFailure } = searchActions
const initialState = {
  devices: null,
  error: null,
  fetching: false,
  showApplicationDialog: false,
}

const computeSelectedApplications = ({ devices, selectedThings }) => {
  return _(devices)
    .filter(application => (_.difference(selectedThings, application.devices).length === 0))
    .map('uuid')
    .value()
}

export default createReducer({
  [dismissApplicationDialog]: state => ({
    ...state,
    showApplicationDialog: false,
    selectedApplications: [],
  }),
  [searchFailure]: (state, error) => ({ ...initialState, error, fetching: false }),
  [searchRequest]: () => ({ ...initialState, fetching: true }),
  [searchSuccess]: (state, devices) => {
    return {
      ...initialState,
      devices: _.filter(devices, { type: 'octoblu:application' }),
      fetching: false,
    }
  },
  [showApplicationDialog]: (state, selectedThings) => {
    const selectedApplications = computeSelectedApplications({
      devices: state.devices,
      selectedThings,
    })
    return {
      ...state,
      selectedApplications,
      showApplicationDialog: true,
    }
  },
}, initialState)
