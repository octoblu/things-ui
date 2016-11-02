import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight }  from 'react-syntax-highlighter/dist/styles';

import { setupMessageSubscription } from '../../actions/thing'
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

    const { uuid, token } = getMeshbluConfig()
    this.deviceFirehose = new DeviceFirehose({ uuid, token })
  }

  componentDidMount() {
    const userDevice          = getMeshbluConfig()
    const { dispatch, thing } = this.props

    dispatch(setupMessageSubscription({ userDevice, device: thing.device }))
      .then(() => {
        this.deviceFirehose.connect((err) => {
          if (err) return console.log('Firehose Connection Error')
          console.log('Firehose Connected!')
          this.deviceFirehose.on(`device:${thing.device.uuid}`, this.handleFirehoseMessage)
        })
      })
      .catch(() => console.log('meh :('))
  }

  handleFirehoseMessage = (msg) => {
    console.log('Firehose Message', msg);
  }

  render() {
    return (
      <div>
        {/* <SyntaxHighlighter language='javascript' style={tomorrowNight}>{}</SyntaxHighlighter> */}
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
