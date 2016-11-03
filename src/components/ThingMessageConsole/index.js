import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight }  from 'react-syntax-highlighter/dist/styles';
import Firehose from 'meshblu-firehose-socket.io/src/firehose-socket-io.coffee'
import { FIREHOSE_CONFIG } from 'config'

import { setupMessageSubscription, messageReceived } from '../../actions/thing'

import {
  addUserToDeviceWhiteLists,
  createMessageSubscriptionsForDevice,
} from '../../services/subscription-service'
import { getMeshbluConfig } from '../../services/auth-service'
import { getCredentials } from '../../services/auth-service'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

class ThingMessageConsole extends React.Component {
  constructor(props) {
    super(props)

    const { uuid, token } = getMeshbluConfig()
    const meshbluConfig = _.assign({ uuid, token }, FIREHOSE_CONFIG)

    this.firehose = new Firehose({ meshbluConfig })
  }

  componentDidMount() {
    const userDevice          = getMeshbluConfig()
    const { dispatch, thing } = this.props
    const { device }          = thing

    dispatch(setupMessageSubscription({ userDevice, device }))
      .then(() => {
        this.firehose.connect({ uuid: userDevice.uuid }, (err) => {
          if (err) return console.log('Firehose Connection Error')
          this.firehose.on('message', this.handleFirehoseMessage)
        })
      })
      .catch(() => console.log('meh :('))
  }

  handleFirehoseMessage = (msg) => {
    this.props.dispatch(messageReceived(msg))
  }

  render() {
    const { messages }= this.props.thing
    return (
      <div>
        <SyntaxHighlighter language='javascript' style={tomorrowNight}>{JSON.stringify(messages, null, 2)}</SyntaxHighlighter>
      </div>
    )
  }
}

ThingMessageConsole.propTypes    = propTypes
ThingMessageConsole.defaultProps = defaultProps


const mapStateToProps = ({ thing, messages }) => {
  return { thing }
}

export default connect(mapStateToProps)(ThingMessageConsole)
