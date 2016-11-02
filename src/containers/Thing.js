import RefParser from 'json-schema-ref-parser'
import _ from 'lodash'
import React, { PropTypes } from 'react'
import { getDevice } from 'redux-meshblu'
import { connect } from 'react-redux'

import {
  derefDeviceSchemas,
  derefDeviceSchemasFailure,
  derefDeviceSchemasSuccess,
} from '../actions/thing'

import ThingLayout from '../components/ThingLayout'

import { getMeshbluConfig } from '../services/auth-service'

const propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  thing: PropTypes.object,
}

class Thing extends React.Component {
  componentDidMount() {
    const meshbluConfig = getMeshbluConfig()
    const { dispatch, params } = this.props

    dispatch(getDevice({ uuid: params.deviceUuid, meshbluConfig }))
      .then(({ payload }) => {
        if (_.get(payload.schemas.message, '$ref')) {
          dispatch(derefDeviceSchemas(payload))
        }
      })
  }


  render() {
    // return null
    return (
      <ThingLayout thing={this.props.thing} />
    )
  }
}

Thing.propTypes = propTypes

const mapStateToProps = ({ thing }) => {
  return { thing }
}

export default connect(mapStateToProps)(Thing)
