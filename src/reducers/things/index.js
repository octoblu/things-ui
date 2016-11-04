import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'
import { selectThing, unselectThing } from '../../actions/thing'
import {
  clearSelectedThings,
  deleteSelectedThings,
  deleteSelectedThingsSuccess,
  deleteSelectedThingsFailure,
  dismissDeleteDialog,
  showDeleteDialog,
  dismissTagDialog,
  showTagDialog,
} from '../../actions/things'


const { searchRequest, searchSuccess, searchFailure } = searchActions
const initialState = {
  applications: [],
  deletingThings: false,
  devices: null,
  error: null,
  fetching: false,
  selectedApplications: [],
  selectedThings: [],
  showDeleteDialog: false,
  showTagDialog: false,
}

export default createReducer({
  [clearSelectedThings]: state => ({ ...state, selectedThings: [] }),
  [deleteSelectedThings]: state => ({ ...state, deletingThings: true }),
  [deleteSelectedThingsSuccess]: (state) => {
    const updatedDevices =  _.filter(state.devices, ({ uuid }) => {
      return (!_.includes(state.selectedThings, uuid))
    })

    return {
      ...state,
      deletingThings: false,
      devices: updatedDevices,
      selectedThings: [],
    }
  },
  [dismissDeleteDialog]: state => ({ ...state, showDeleteDialog: false }),
  [showDeleteDialog]: state => ({ ...state, showDeleteDialog: true }),
  [dismissTagDialog]: state => ({ ...state, showTagDialog: false, selectedApplications: [] }),
  [showTagDialog]: (state) => {
    const { devices, selectedThings } = state
    const selectedApplications = _(devices)
      .filter({ type: 'octoblu:application' })
      .filter(application => (_.difference(selectedThings, application.devices).length === 0))
      .map('uuid')
      .value()

    return {
      ...state,
      selectedApplications,
      showTagDialog: true,
    }
  },
  [searchRequest]: () => ({ ...initialState, fetching: true }),
  [searchSuccess]: (state, devices) => {
    const applications = _(devices)
      .filter({ type: 'octoblu:application' })
      .map('uuid')
      .value()

    return {
      ...initialState,
      applications,
      devices,
      fetching: false,
      selectedThings: [],
    }
  },
  [searchFailure]: (state, payload) => ({ ...initialState, error: payload, fetching: false }),
  [selectThing]: (state, payload) => {
    const { selectedThings } = state
    selectedThings.push(payload)
    return { ...state, selectedThings }
  },
  [unselectThing]: (state, payload) => {
    const filteredDevices = _.without(state.selectedThings, payload)
    return { ...state, selectedThings: filteredDevices }
  },
}, initialState)
