import React, { PropTypes } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';

import { tomorrowNight }  from 'react-syntax-highlighter/dist/styles';
import { addMessagingPermissionsForDevice } from '../../services/subscription-service'
import { getMeshbluConfig } from '../../services/auth-service'
import { getCredentials } from '../../services/auth-service'
import DeviceFirehose from '../../services/device-firehose'

const propTypes = {}
const defaultProps = {}

class ThingMessageConsole extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      thing: null,
      firehose: null,
    }
  }

  componentDidMount () {

    const credentials = getMeshbluConfig()
    const { device } = this.props.thing
    //Use Async or Bluebird
    addMessagingPermissionsForDevice({ subscriberUuid: credentials.uuid, emitterDevice: device })
    createMessageSubscriptionsForDevice({ subscriberUuid: credentials.uuid, emitterDevice: device })
    this.setState({
      credentials,
      thing,
    })
    this.deviceFirehose = new DeviceFirehose(credentials)
    this.deviceFirehose.connect(this.handleFirehoseConnectionError)
    this.deviceFirehose.on('message', this.handleFirehoseMessage)
    this.setState({
      credentials,
      thing,
      firehose: deviceFireHose
    })
    // this.deviceFireHose = createFireHoseConnection({ emitterUuid: device.uuid , subscriberUuid: credentials.uuid })
    // this.deviceFirehose.connect(this.handleFirehoseConnectionError)
    // this.deviceFirehose.on(`message`, this.handleFirehoseMessage)

    this.deviceFirehose = new DeviceFirehose(credentials)
    this.deviceFirehose.connect(this.handleFirehoseConnectionError)
  }

  handleFirehoseConnectionError = (err) => {
    console.log('Firehose Connection Error', err);
  }

  handleFirehoseMessage = (msg) => {
    console.log('Firehose Message', msg);
  }

  render() {
    return (
      <div>
        <SyntaxHighlighter language='javascript' style={tomorrowNight}>var greeting = 'hello'</SyntaxHighlighter>
      </div>
    )
  }
}

ThingMessageConsole.propTypes    = propTypes
ThingMessageConsole.defaultProps = defaultProps

export default ThingMessageConsole
