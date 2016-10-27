import React, { PropTypes } from 'react'
import { addMessagingPermissionsForDevice } from '../../services/subscription-service'
import { getMeshbluConfig } from '../../services/auth-service'
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
  }

  handleFirehoseConnectionError = (err) => {
    console.log('Firehose Connection Error', err);
  }

  handleFirehoseMessage = (msg) => {
    console.log('Firehose Message', msg);
  }

  render() {
    return <div>ThingMessageConsole</div>
  }
}

ThingMessageConsole.propTypes    = propTypes
ThingMessageConsole.defaultProps = defaultProps

export default ThingMessageConsole
