import React, { PropTypes } from 'react'
import _ from 'lodash'

import ThingMessageInputForm from '../components/ThingMessageInputForm'
import ThingMessageConsole from '../components/ThingMessageConsole'


const propTypes = {
  messageSchema: PropTypes.object,
  thing: PropTypes.object,
  formSchema: PropTypes.object,
}

const defaultProps = {
}

class MessageThing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      thing: null,
      messageSchema: null,
      formSchema: null,
    }
  }
  sendMessageHandler(message){

  }
  componentDidMount() {
      const {thing, messageSchema, formSchema } = this.props
    this.setState({
      thing,
      messageSchema,
      formSchema
    })
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
