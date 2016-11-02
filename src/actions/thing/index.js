import RefParser from 'json-schema-ref-parser'
import Promise from 'bluebird'
import { createAction } from 'redux-act'
import _ from 'lodash'
import {
  addUserToDeviceWhiteLists,
  createMessageSubscriptionsForDevice,
} from '../../services/subscription-service'

const addUserToDeviceWhiteListsPromise           = Promise.promisify(addUserToDeviceWhiteLists)
const createMessageSubscriptionsForDevicePromise = Promise.promisify(createMessageSubscriptionsForDevice)

const selectThing               = createAction('/thing/selection/add')
const unselectThing             = createAction('/thing/selection/remove')
const derefDeviceSchemasRequest = createAction('/thing/selection/deref/request')
const derefDeviceSchemasSuccess = createAction('/thing/selection/deref/success')
const derefDeviceSchemasFailure = createAction('/thing/selection/deref/failure')
const setupMessageSubscriptionRequest = createAction('/thing/selection/setupMessageSubscription/request')
const setupMessageSubscriptionSuccess = createAction('/thing/selection/setupMessageSubscription/success')
const setupMessageSubscriptionFailure = createAction('/thing/selection/setupMessageSubscription/failure')

const derefDeviceSchemas = (device) => {
  return (dispatch) => {
    dispatch(derefDeviceSchemasRequest(device))
    return RefParser.dereference(device.schemas, (err, schemas) => {
      if (err) return dispatch(derefDeviceSchemasFailure(err))
      return dispatch(derefDeviceSchemasSuccess(schemas))
    })
  }
}

const setupMessageSubscription = ({ userDevice, device }) => {
  return (dispatch) => {
    dispatch(setupMessageSubscriptionRequest(device))

    return addUserToDeviceWhiteListsPromise({ userDevice,  device })
      .then(() => createMessageSubscriptionsForDevice({ userDevice, emitterUuid: device.uuid }))
      .then(() => dispatch(setupMessageSubscriptionSuccess()))
      .catch(err => dispatch(setupMessageSubscriptionFailure(err)))
  }
}

export {
  derefDeviceSchemas,
  derefDeviceSchemasRequest,
  derefDeviceSchemasFailure,
  derefDeviceSchemasSuccess,
  selectThing,
  setupMessageSubscription,
  unselectThing,
}
