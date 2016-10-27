import _ from 'lodash'
import React, { PropTypes } from 'react'
import ThingMessageConsole from '../ThingMessageConsole'
import { DeviceMessageSchemaContainer } from 'zooid-meshblu-device-editor'
import styles from './styles.css'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {}

const sendMessageHandler = (message) => {
  console.log('Message!', message)
}

const MessageThing = ({ thing }) => {
  if (_.isEmpty(thing.device)) return null
  if (!thing.schemasDerefed) return <div>Dereferencing Schemas</div>

  return (
    <div className={styles.root}>
      <div className={styles.messageInput}>
        <DeviceMessageSchemaContainer
          device={thing.device}
          onSubmit={sendMessageHandler.bind(this)}
          className={styles.messageInput}
        />
      </div>
      <div className={styles.messageConsole}>
        <ThingMessageConsole
          thing={thing}
        />
      </div>
    </div>
  )
}

MessageThing.propTypes    = propTypes
MessageThing.defaultProps = defaultProps

export default MessageThing
