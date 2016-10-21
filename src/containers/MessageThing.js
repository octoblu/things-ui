import React, { PropTypes } from 'react'
import _ from 'lodash'

import ThingMessageInputForm from '../components/ThingMessageInputForm'
import ThingMessageConsole from '../components/ThingMessageConsole'


const propTypes = {
}

const defaultProps = {
}

class MessageThing extends React.Component {
  constructor(props) {
    super(props)
    const {thing, messageSchema, formSchema} = props
    this.state = {
      thing,
      messageSchema,
      formSchema
    }

  }
  sendMessageHandler(message){

  }
  componentDidMount() {
    //set up subscriptions if we need to
  }
  render() {
    const { formSchema, messageSchema, thing } = this.state
    if (_.isEmpty(thing)) return <div>No Thing</div>
    if (_.isEmpty(messageSchema)) return <div>No Message Schema</div>

    return (
      <div>
        <ThingMessageInputForm
          messageSchema={messageSchema}
          formSchema={formSchema}
          onSend={this.sendMessageHandler}
        />
        <ThingMessageConsole thing={thing} />
      </div>
    )
  }
}

MessageThing.propTypes    = propTypes
MessageThing.defaultProps = defaultProps

export default MessageThing
