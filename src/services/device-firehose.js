import MeshbluHTTP from 'browser-meshblu-http'
import _ from 'lodash'
import Firehose from 'meshblu-firehose-socket.io/src/firehose-socket-io.coffee'
import moment from 'moment'
import EventEmitter2 from 'eventemitter2'

import { FIREHOSE_CONFIG } from 'config'

export default class DeviceFirehose extends EventEmitter2 {
  constructor({ uuid, token }) {
    super()
    this._lastUpdatedAt = 0
    this._onDeviceHandlers = {}

    this._meshbluConfig = _.assign({ uuid, token }, FIREHOSE_CONFIG)
    this._firehose = new Firehose({ meshbluConfig: this._meshbluConfig })
    this._firehose.on('message', this._onMessage)
  }

  connect(callback) {
    const { uuid } = this._meshbluConfig
    this._firehose.connect({ uuid }, (error) => callback(error))
  }

  close(callback){
    this._firehose.close(callback)
  }

  refresh(targetUUID, callback) {
    if (_.isEmpty(targetUUID)) return callback(new Error('Invalid Device UUID'))
    const { uuid, token } = this._meshbluConfig
    const meshblu = new MeshbluHTTP({ uuid, token })
    meshblu.update(targetUUID, {refresh: Date.now()}, (error) => callback(error))
  }

  _isStale(message) {
    const updatedAtStr = _.get(message, 'data.meshblu.updatedAt')
    if (_.isEmpty(updatedAtStr)) return true
    const updatedAt = moment.utc(updatedAtStr).valueOf()
    return (updatedAt < this._lastUpdatedAt)
  }

  _onMessage = (message) => {
    if (this._isStale(message)) return

    const device = this._parseDevice(message)
    this._updateLastUpdatedAt(message)
    this.emit(`device:${device.uuid}`, device)
  }

  _parseDevice(message) {
    return _.get(message, 'data')
  }

  _updateLastUpdatedAt(message) {
    const updatedAtStr  = _.get(message, 'data.meshblu.updatedAt')
    this._lastUpdatedAt = moment.utc(updatedAtStr).valueOf()
  }
}
