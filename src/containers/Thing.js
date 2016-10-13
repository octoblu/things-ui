import RefParser from 'json-schema-ref-parser'
import _ from 'lodash'
import React, { PropTypes } from 'react'
import { getDevice } from 'redux-meshblu'
import { connect } from 'react-redux'

import ThingLayout from '../components/ThingLayout'

import { getMeshbluConfig } from '../services/auth-service'

const propTypes = {
  getDevice: PropTypes.func,
  params: PropTypes.object,
  thing: PropTypes.object,
}

class Thing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: null,
      form: null,
    }
  }
  componentDidMount() {
    const meshbluConfig = getMeshbluConfig()
    const { deviceUuid } = this.props.params

    this.props.getDevice(deviceUuid, meshbluConfig)
    .then(({ payload }) => {
      RefParser.dereference(payload.schemas)
      .then((schemas) => {
        this.setState({
          form: schemas.form,
          message: schemas.message,
        })
      })
      .catch((err) => {
        console.error(err)
      })
    })
  }

  render() {
    const { form, message } = this.state

    return (
      <ThingLayout
        formSchema={form}
        messageSchema={message}
        thing={this.props.thing}
      />
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
