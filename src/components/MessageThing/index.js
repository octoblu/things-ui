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

  const { device } = thing
  const meshblu = new MeshbluHttp(credentials)

  console.log('Message is', msg)
  const message = _.assign(msg, { devices: [device.uuid] })
  meshblu.message(message, (error, result ) => {
    console.log('Result of sending messages', error, result)
  })
}

const MessageThing = ({ thing }) => {
  if (_.isEmpty(thing.device)) return null
  if (!thing.schemasDerefed) return <div>Dereferencing Schemas</div>

  return (
    <div className={styles.root}>
      <div className={styles.messageInput}>
        <DeviceMessageSchemaContainer
          device={thing.device}
          onSubmit={(message) => sendMessageHandler(message, thing)}
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
