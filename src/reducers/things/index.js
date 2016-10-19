import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'
import { selectThing, unselectThing } from '../../actions/thing'
import { clearSelectedThings } from '../../actions/things'


const { searchRequest, searchSuccess, searchFailure } = searchActions
const initialState = {
  devices: null,
  error: null,
  fetching: false,
  selectedThings: [],
}

export default createReducer({
  [clearSelectedThings]: state => ({ ...state, selectedThings: [] }),
  [searchRequest]: () => ({ ...initialState, fetching: true }),
  [searchSuccess]: (state, payload) => ({ ...initialState, devices: payload, fetching: false }),
  [searchFailure]: (state, payload) => ({ ...initialState, error: payload, fetching: false }),
  [selectThing]: (state, payload) => {
    const { selectedThings } = state
    selectedThings.push(payload)
    return { ...state, selectedThings }
  },
  [unselectThing]: (state, payload) => {
    const { selectedThings } = state
    const filteredDevices = _.filter(selectedThings, deviceUuid => deviceUuid !== payload)
    return { ...state, selectedThings: filteredDevices }
  },
}, initialState)
