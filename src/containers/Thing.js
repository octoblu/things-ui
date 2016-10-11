import _ from 'lodash'
import React, { PropTypes } from 'react'
import { getDevice } from 'redux-meshblu'
import { connect } from 'react-redux'
import Heading from 'zooid-heading'
import Page from 'zooid-page'

import { getMeshbluConfig } from '../services/auth-service'

const propTypes = {
  getDevice: PropTypes.func,
  params: PropTypes.object,
  thing: PropTypes.object,
}

class Thing extends React.Component {
  componentDidMount() {
    const meshbluConfig = getMeshbluConfig()
    const { deviceUuid } = this.props.params

    this.props.getDevice(deviceUuid, meshbluConfig)
  }

  render() {
    const { device, error, fetching } = this.props.thing

    if (fetching) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (_.isEmpty(device)) return <div>No Thing Found</div>

    const { name, type, logo } = device

    return (
      <Page>
      </Page>
    )
  }
}

Thing.propTypes = propTypes

const mapStateToProps = ({ thing }) => {
  return { thing }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDevice: (deviceUuid, meshbluConfig) => dispatch(getDevice(deviceUuid, meshbluConfig)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Thing)
