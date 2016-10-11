import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'

const { searchRequest, searchSuccess, searchFailure } = searchActions

const initialState = {
  devices: null,
  error: null,
  fetching: false,
}

export default createReducer({
  [searchRequest]: () => ({ ...initialState, fetching: true }),
  [searchSuccess]: (state, payload) => ({ ...initialState, devices: payload, fetching: false }),
  [searchFailure]: (state, payload) => ({ ...initialState, error: payload, fetching: false }),
}, initialState)
