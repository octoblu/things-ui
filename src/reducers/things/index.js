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
  deletingThings: false,
  devices: null,
  error: null,
  fetching: false,
  selectedThings: [],
  showDeleteDialog: false,
  showTagDialog: false,
}

export default createReducer({
  [clearSelectedThings]: state => ({ ...state, selectedThings: [] }),
  [deleteSelectedThings]: (state) => {
    return { ...state, deletingThings: true }
  },
  [deleteSelectedThingsSuccess]: (state) => {
    const updatedDevices =  _.differenceBy(state.devices, state.selectedThings, 'uuid')

    return {
      ...state,
      deletingThings: false,
      devices: updatedDevices,
      selectedThings: [],
    }
  },
  [dismissDeleteDialog]: state => ({ ...state, showDeleteDialog: false }),
  [showDeleteDialog]: state => ({ ...state, showDeleteDialog: true }),
  [dismissTagDialog]: state => ({ ...state, showTagDialog: false }),
  [showTagDialog]: state => ({ ...state, showTagDialog: true }),
  [searchRequest]: () => ({ ...initialState, fetching: true }),
  [searchSuccess]: (state, devices) => {
    const applications = _.filter(devices, {'type': 'octoblu:application'})

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
    selectedThings.push({ uuid: payload })
    return { ...state, selectedThings }
  },
  [unselectThing]: (state, payload) => {
    const { selectedThings } = state
    const filteredDevices = _.reject(selectedThings, { uuid: payload })
    return { ...state, selectedThings: filteredDevices }
  },
}, initialState)
