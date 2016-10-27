import React, { PropTypes } from 'react'
import { DeviceMessageSchemaContainer } from 'zooid-meshblu-device-editor'
import _ from 'lodash'
import styles from './styles.css'

const propTypes = {
  onSend: PropTypes.func,
  messageSchema: PropTypes.object,
  thing: PropTypes.object,
}

const defaultProps = {
  onSend: _.noop,
  messageSchema: null,
  thing: null,
}

const sendMessageHandler = (message) => {
  this.props.onSend(message)
}

const MessageSchemaForm = ({ messageSchema, onSend, thing }) => {
  if (_.isEmpty(messageSchema)) return null
  return (
    <div className={styles.root}>
      <DeviceMessageSchemaContainer
        device={thing.device}
        message={messageSchema}
        onSubmit={sendMessageHandler.bind(this)}
      />
    </div>
  )
}

MessageSchemaForm.propTypes    = propTypes
MessageSchemaForm.defaultProps = defaultProps

export default MessageSchemaForm
