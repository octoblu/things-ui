import RefParser from 'json-schema-ref-parser'
import { createAction } from 'redux-act'

const selectThing               = createAction('/thing/selection/add')
const unselectThing             = createAction('/thing/selection/remove')
const derefDeviceSchemasRequest = createAction('/thing/selection/deref/request')
const derefDeviceSchemasSuccess = createAction('/thing/selection/deref/success')
const derefDeviceSchemasFailure = createAction('/thing/selection/deref/failure')

const derefDeviceSchemas = (device) => {
  return (dispatch) => {
    dispatch(derefDeviceSchemasRequest(device))

    return RefParser.dereference(device.schemas, (err, schemas) => {
      if (err) return dispatch(derefDeviceSchemasFailure(err))
      return dispatch(derefDeviceSchemasSuccess(schemas))
    })
  }
}

export {
  derefDeviceSchemas,
  derefDeviceSchemasRequest,
  derefDeviceSchemasFailure,
  derefDeviceSchemasSuccess,
  selectThing,
  unselectThing,
}
