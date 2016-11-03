import _ from 'lodash'
import { createReducer } from 'redux-act'
import { getDeviceActions } from 'redux-meshblu'

import {
  derefDeviceSchemas,
  derefDeviceSchemasRequest,
  derefDeviceSchemasFailure,
  derefDeviceSchemasSuccess,
  messageReceived,
} from '../../actions/thing'

const { getDeviceRequest, getDeviceSuccess, getDeviceFailure } = getDeviceActions

const initialState = {
  device: null,
  error: null,
  fetching: false,
  messages: [],
  schemasDerefed: false,
}

export default createReducer({
  [getDeviceRequest]: () => ({ ...initialState, fetching: true }),
  [getDeviceSuccess]: (state, device) => {
    return {
      ...initialState,
      device,
      fetching: false,
    }
  },
  [derefDeviceSchemasRequest]: state => ({ ...state, schemasDerefed: false }),
  [derefDeviceSchemasSuccess]: (state, schemas) => {
    const { device } = state
    const updatedDevice = { ...device, schemas }
    return {
      ...state,
      device: updatedDevice,
      schemasDerefed: true,
    }
  },
  [getDeviceFailure]: (state, payload) => ({ ...initialState, error: payload, fetching: false }),
  [getDeviceFailure]: (state, payload) => ({ ...initialState, error: payload, fetching: false }),
  [messageReceived]: (state, payload) => {
    const { messages } = state
    return { ...state, messages: [...messages, payload] }
  },
}, initialState)
