import _ from 'lodash'
import { createReducer } from 'redux-act'
import { getDeviceActions } from 'redux-meshblu'

const { getDeviceRequest, getDeviceSuccess, getDeviceFailure } = getDeviceActions

const initialState = {
  device: null,
  error: null,
  fetching: false,
}

export default createReducer({
  [getDeviceRequest]: () => ({ ...initialState, fetching: true }),
  [getDeviceSuccess]: (state, payload) => ({ ...initialState, device: payload, fetching: false }),
  [getDeviceFailure]: (state, payload) => ({ ...initialState, error: payload, fetching: false }),
}, initialState)
