import _ from 'lodash'
import async from 'async'
import apply from 'async/apply'
import MeshbluHttp from 'browser-meshblu-http'

import { getMeshbluConfig } from './auth-service'

const _isV2Device = (device) => {
  if (_.get(device, 'meshblu.version') === '2.0.0') return true
  return false
}

const _addV2MessagingPermissions = ({ userDevice, device }, callback) => {
  const meshbluHttp = new MeshbluHttp(userDevice)

  const updateQuery = {
    $addToSet: {
      'meshblu.whitelists.message.received': { uuid: userDevice.uuid },
      'meshblu.whitelists.message.sent': { uuid: userDevice.uuid },
    },
  }
  return meshbluHttp.updateDangerously(device.uuid, updateQuery, callback)
}

const _addV1MessagingPermissions = ({ userDevice, device }, callback) => {
  const meshbluHttp = new MeshbluHttp(userDevice)
  const updateQuery = {
    $addToSet: {
      sendWhitelist: userDevice.uuid,
      receiveWhitelist: userDevice.uuid,
    },
  }

  return meshbluHttp.updateDangerously(device.uuid, updateQuery, callback)
}

const addUserToDeviceWhiteLists = ({ userDevice = getMeshbluConfig(), device }, callback) => {
  if (_isV2Device(device)) {
    return _addV2MessagingPermissions({ userDevice, device }, callback)
  }
  return _addV1MessagingPermissions({ userDevice, device }, callback)
}

const createMessageSubscriptionsForDevice = ({ userDevice = getMeshbluConfig(), emitterUuid }, callback) => {
  const meshbluHttp = new MeshbluHttp(userDevice)

  async.series([
    apply(meshbluHttp.createSubscription, {
      subscriberUuid: userDevice.uuid,
      emitterUuid,
      type: 'message.received',
    }),
    apply(meshbluHttp.createSubscription, {
      subscriberUuid: userDevice.uuid,
      emitterUuid,
      type: 'message.sent',
    }),
    apply(meshbluHttp.createSubscription, {
      subscriberUuid: emitterUuid,
      emitterUuid,
      type: 'message.received',
    }),
  ], callback)
}

export {
  addUserToDeviceWhiteLists,
  createMessageSubscriptionsForDevice,
}
