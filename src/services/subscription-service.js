import _ from 'lodash'
import MeshbluHttp from 'browser-meshblu-http'
import { MESHBLU_HOST, MESHBLU_PORT } from 'config'
/**
  Add message send and receive message permissions to the emitter device from the subscriber
  The emitterDevice can be a v1 or v2 device.
**/

function createMessageSubscriptionsForDevice({ subscriberCredentials, emitterUuid }) {
  const meshbluHttp = new MeshbluHttp({
    uuid: subscriberCredentials.uuid,
    token: subscriberCredentials.token,
    hostname: MESHBLU_HOST,
    port: MESHBLU_PORT,
  })

  meshbluHttp.createSubscription({ subscriberUuid: subscriberCredentials.uuid, emitterUuid, type: 'message.received' })
  meshbluHttp.createSubscription({ subscriberUuid: subscriberCredentials.uuid, emitterUuid, type: 'message.sent' })
}


function addMessagingPermissionsForDevice({ subscriberUuid, emitterDevice }, callback ) {
  if (_isV2Device(emitterDevice)) {
    return _addV2MessagingPermissions({subscriberUuid, emitterUuid: emitterDevice.uuid }, callback)
  }
  return _addV1MessagingPermissions({subscriberUuid, emitterUuid: emitterDevice.uuid }, callback)
}

function _isV2Device(device) {
  if (_.get(device, 'meshblu.version') === '2.0.0') return true
  return false
}

function _addV2MessagingPermissions({ subscriberCredentials, emitterDevice }, callback) {
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

  meshbluHttp.updateDangerously(emitterDevice.uuid, updateQuery, callback)
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
      sendWhitelist: { uuid: subscriberCredentials.uuid },
      receiveWhitelist: { uuid: subscriberCredentials.uuid },
    },
  }

  meshbluHttp.updateDangerously(emitterDevice.uuid, updateQuery, callback)
}

export {
  addMessagingPermissionsForDevice,
  createMessageSubscriptionsForDevice
}
