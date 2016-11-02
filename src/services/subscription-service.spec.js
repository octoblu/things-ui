import { expect } from 'chai'
import shmock from 'shmock'
import enableDestroy from 'server-destroy'
import _ from 'lodash'

import {
  addUserToDeviceWhiteLists,
  createMessageSubscriptionsForDevice,
} from './subscription-service'


describe('Subscription Service', () => {
  let meshbluMock
  const meshbluConnection = {
    hostname: '127.0.0.1',
    port: 0xDEAD,
    protocol: 'http',
  }

  const emitterV1Device = {
    uuid: 'emitter-device-uuid',
    sendWhiteList: [],
    receiveWhitelist: [],
  }

  const device = {
    uuid: 'emitter-device-uuid',
    meshblu: {
      version: '2.0.0',
      whitelists: {

      },
    },
  }

  const subscriberDevice = {
    uuid: 'subscriber-device-uuid',
    token: 'subscriber-device-token',
  }

  const userDevice = _.extend(subscriberDevice, meshbluConnection)
  const userAuth = new Buffer('subscriber-device-uuid:subscriber-device-token')
  .toString('base64')

  before('set up meshblu mocks', () => {
    meshbluMock = shmock(0xDEAD)
    enableDestroy(meshbluMock)
  })

  after('tear down meshblu mocks', (done) => {
    meshbluMock.destroy(done)
  })

  describe('->addUserToDeviceWhiteLists', () => {
    context('When the emitter is a V1 device', () => {
      let emitterUpdateHandler
      beforeEach(() => {
        emitterUpdateHandler = meshbluMock.put('/v2/devices/emitter-device-uuid')
        .send({
          $addToSet: {
            sendWhitelist: 'subscriber-device-uuid',
            receiveWhitelist: 'subscriber-device-uuid',
          },
        })
        .set('Authorization', `Basic ${userAuth}`)
        .reply(200, {
          uuid: 'emitter-device-uuid',
          sendWhiteList: ['subscriber-device-uuid'],
          receiveWhitelist: ['subscriber-device-uuid'],
        })
      })
      it('should update the sendWhitelist and receiveWhitelist', (done) => {
        addUserToDeviceWhiteLists({
          userDevice,
          device: emitterV1Device,
        },
        (error, result) => {
          emitterUpdateHandler.done()
          expect(result).to.deep.equal({
            uuid: 'emitter-device-uuid',
            sendWhiteList: ['subscriber-device-uuid'],
            receiveWhitelist: ['subscriber-device-uuid'],
          })
          done()
        })
      })
    })
    context('When the emitter is a V2 device', () => {
      let emitterUpdateHandler
      beforeEach(() => {
        emitterUpdateHandler = meshbluMock.put('/v2/devices/emitter-device-uuid')
        .send({
          $addToSet: {
            'meshblu.whitelists.message.received': { uuid: userDevice.uuid },
            'meshblu.whitelists.message.sent': { uuid: userDevice.uuid },
          },
        })
        .set('Authorization', `Basic ${userAuth}`)
        .reply(200, {
          uuid: 'emitter-device-uuid',
          sendWhiteList: ['subscriber-device-uuid'],
          receiveWhitelist: ['subscriber-device-uuid'],
        })
      })
      it('should update the sendWhitelist and receiveWhitelist', (done) => {
        addUserToDeviceWhiteLists({
          userDevice,
          device,
        },
        (error, result) => {
          emitterUpdateHandler.done()
          expect(result).to.deep.equal({
            uuid: 'emitter-device-uuid',
            sendWhiteList: ['subscriber-device-uuid'],
            receiveWhitelist: ['subscriber-device-uuid'],
          })
          done()
        })
      })
    })
  })

  describe('->createMessageSubscriptionsForDevice',  () => {
    let subscriberMessageReceivedHandler
    let subscriberMessageSentHandler
    let emitterMessageReceivedHandler
    beforeEach('Set up mock calls', (done) => {
      subscriberMessageReceivedHandler =
        meshbluMock
        .post('/v2/devices/subscriber-device-uuid/subscriptions/emitter-device-uuid/message.received')
        .reply(200)

      subscriberMessageSentHandler =
        meshbluMock
        .post('/v2/devices/subscriber-device-uuid/subscriptions/emitter-device-uuid/message.sent')
        .reply(200)

      emitterMessageReceivedHandler =
        meshbluMock
        .post('/v2/devices/emitter-device-uuid/subscriptions/emitter-device-uuid/message.received')
        .reply(200)

      createMessageSubscriptionsForDevice(
        {
          userDevice,
          emitterUuid: device.uuid,
        }, (error) => {
        done(error)
      })
    })

    it('should create message.received subscription on the subscriber device with the emitter UUID', (done) => {
      subscriberMessageReceivedHandler.done()
      done()
    })
    it('should create message.sent subscription on the subscriber device with the emitter UUID', (done) => {
      subscriberMessageSentHandler.done()
      done()
    })
    it('should create a message.received subscription on the emitter device with the emitter UUID', (done) => {
      emitterMessageReceivedHandler.done()
      done()
    })
  })
})
