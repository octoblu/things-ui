import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight }  from 'react-syntax-highlighter/dist/styles';

import {
  addUserToDeviceWhiteLists,
  createMessageSubscriptionsForDevice,
} from '../../services/subscription-service'

import { getMeshbluConfig } from '../../services/auth-service'
import { getCredentials } from '../../services/auth-service'
import DeviceFirehose from '../../services/device-firehose'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

class ThingMessageConsole extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      thing: null,
      firehose: null,
    }
  }

  componentDidMount() {
    const userDevice = getMeshbluConfig()
    const { dispatch, thing }   = this.props
    const { device }            = thing

    console.log('ThingMessageConsole->componentDidMount', device, userDevice)
    console.log('userDevice', userDevice)

    dispatch(addUserToDeviceWhiteLists({ userDevice,  device: device }))
      .then(() => dispatch(subscribeUserToDeviceMessages({ userDevice, emitterUuid: device.uuid})))
      .catch((err) => console.log('Error'))
    // subscribeUserToDeviceMessages
    // connect firehose
    // listen for messages






    addUserToDeviceWhiteLists({ userDevice,  device: device }, (error, results) => {
      console.log('addMessagePermissionsForDevice', error, results)
      createMessageSubscriptionsForDevice({ userDevice, emitterUuid: device.uuid}, (subscriptionError, subResults) => {
        console.log('addMessagePermissionsForDevice',subscriptionError, subResults)
        const deviceFirehose = new DeviceFirehose({
          uuid: userDevice.uuid,
          token: userDevice.token,
        })
        deviceFirehose.connect(this.handleFirehoseConnectionError)
        deviceFirehose.on('message', this.handleFirehoseMessage)
        this.setState({
          firehose: deviceFirehose
        })
      })
    })
  }

  handleFirehoseConnectionError = (err, result) => {
    console.log('Firehose Connection Error', JSON.stringify(err, null, 2));
  }

  handleFirehoseMessage = (msg) => {
    console.log('Firehose Message', msg);
  }

  render() {
    return (
      <div>
        <SyntaxHighlighter language='javascript' style={tomorrowNight}>{}</SyntaxHighlighter>
      </div>
    )
  }
}

ThingMessageConsole.propTypes    = propTypes
ThingMessageConsole.defaultProps = defaultProps


const mapStateToProps = ({ thing }) => {
  return { thing }
}

export default connect(mapStateToProps)(ThingMessageConsole)
