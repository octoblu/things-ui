import _ from 'lodash'
import React, { PropTypes } from 'react'
import MeshbluHttp from 'browser-meshblu-http'
import { DeviceMessageSchemaContainer } from 'zooid-meshblu-device-editor'
import { MESHBLU_HOST, MESHBLU_PORT } from 'config'
import ThingMessageConsole from '../ThingMessageConsole'
import { getMeshbluConfig } from '../../services/auth-service'

import styles from './styles.css'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {}

const sendMessageHandler = (msg, thing) => {
  const credentials = _.assign(getMeshbluConfig(), {
    hostname: MESHBLU_HOST,
    port: MESHBLU_PORT,
  })

  const { device }   = thing
  const meshblu      = new MeshbluHttp(credentials)
  const { metadata } = msg
  const message = {
    ...msg,
    devices: [device.uuid],
    metadata: {
      ...metadata,
      respondTo: device.uuid,
    },
  }

  meshblu.message(message, (error, result) => {
    if (error) return console.error(error)

    return console.log('Result of sending messages', result)
  })
}

const MessageThing = ({ thing }) => {
  if (_.isEmpty(thing.device)) return null

  if (!_.get(thing.device, 'schemas.message')) return <div>No Message Schema :(</div>

  return (
    <div className={styles.root}>
      <div className={styles.messageInput}>
        <DeviceMessageSchemaContainer
          device={thing.device}
          onSubmit={message => sendMessageHandler(message, thing)}
          className={styles.messageInput}
        />
      </div>
      <div className={styles.messageConsole}>
        <ThingMessageConsole />
      </div>
    </div>
  )
}

MessageThing.propTypes    = propTypes
MessageThing.defaultProps = defaultProps

export default MessageThing
