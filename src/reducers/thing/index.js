import _ from 'lodash'
import { createReducer } from 'redux-act'
import { getDeviceActions } from 'redux-meshblu'

import {
  derefDeviceSchemas,
  derefDeviceSchemasRequest,
  derefDeviceSchemasFailure,
  derefDeviceSchemasSuccess,
} from '../../actions/thing'

const { getDeviceRequest, getDeviceSuccess, getDeviceFailure } = getDeviceActions

const initialState = {
  device: null,
  schemasDerefed: false,
  error: null,
  fetching: false,
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
}, initialState)
