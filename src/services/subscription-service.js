import _ from 'lodash'
import async from 'async'
import MeshbluHttp from 'browser-meshblu-http'
import { MESHBLU_HOST, MESHBLU_PORT } from 'config'

import { getMeshbluConfig } from './auth-service'

function createMessageSubscriptionsForDevice({ subscriberCredentials, emitterUuid }, callback) {
  const meshbluHttp = new MeshbluHttp({
    uuid: subscriberCredentials.uuid,
    token: subscriberCredentials.token,
    hostname: MESHBLU_HOST,
    port: MESHBLU_PORT,
  })

  async.series([
    async.apply(meshbluHttp.createSubscription({
      subscriberUuid: subscriberCredentials.uuid,
      emitterUuid,
      type: 'message.received' })),
    async.apply(meshbluHttp.createSubscription({
      subscriberUuid: subscriberCredentials.uuid,
      emitterUuid,
      type: 'message.sent',
    })),
    async.apply(meshbluHttp.createSubscription({
      subscriberUuid: subscriberCredentials.uuid,
      emitterUuid: subscriberCredentials.uuid,
      type: 'message.received',
    })),
  ], callback)
}

function _isV2Device(device) {
  if (_.get(device, 'meshblu.version') === '2.0.0') return true
  return false
}

function _addV2MessagingPermissions({ subscriberCredentials, emitterDevice }, callback) {
  console.log('_addV2', subscriberCredentials)
  const meshbluHttp = new MeshbluHttp({
    uuid: subscriberCredentials.uuid,
    token: subscriberCredentials.token,
    hostname: MESHBLU_HOST,
    port: MESHBLU_PORT,
  })

  const updateQuery = {
    $addToSet: {
      'meshblu.whitelists.message.received': { uuid: subscriberCredentials.uuid },
      'meshblu.whitelists.message.sent': { uuid: subscriberCredentials.uuid },
    },
  }
  return meshbluHttp.updateDangerously(emitterDevice.uuid, updateQuery, callback)
}

function _addV1MessagingPermissions({ subscriberCredentials, emitterDevice }, callback) {
  const meshbluHttp = new MeshbluHttp({
    uuid: subscriberCredentials.uuid,
    token: subscriberCredentials.token,
    hostname: MESHBLU_HOST,
    port: MESHBLU_PORT,
  })
  const updateQuery = {
    $addToSet: {
      sendWhitelist: subscriberCredentials.uuid,
      receiveWhitelist: subscriberCredentials.uuid,
    },
  }

  return meshbluHttp.updateDangerously(emitterDevice.uuid, updateQuery, callback)
}

function addMessagingPermissionsForDevice({ subscriberCredentials = getMeshbluConfig(), emitterDevice }, callback) {
  if (_isV2Device(emitterDevice)) {
    return _addV2MessagingPermissions({ subscriberUuid, emitterUuid: emitterDevice.uuid }, callback)
  }
  return _addV1MessagingPermissions({ subscriberUuid, emitterUuid: emitterDevice.uuid }, callback)
}


export {
  addMessagingPermissionsForDevice,
  createMessageSubscriptionsForDevice,
}
