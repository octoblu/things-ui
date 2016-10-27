import _ from 'lodash'
import React, { PropTypes } from 'react'
import ThingMessageConsole from '../ThingMessageConsole'
import { DeviceMessageSchemaContainer } from 'zooid-meshblu-device-editor'

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
    <div>
      <DeviceMessageSchemaContainer
        device={thing.device}
        onSubmit={sendMessageHandler.bind(this)}
      />

      <ThingMessageConsole thing={thing} />
    </div>
  )
}

MessageThing.propTypes    = propTypes
MessageThing.defaultProps = defaultProps

export default MessageThing
