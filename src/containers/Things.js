import React, { PropTypes } from 'react'
import { search } from 'redux-meshblu'
import { connect } from 'react-redux'

import { getMeshbluConfig } from '../services/auth-service'

import ThingsLayout from '../components/ThingsLayout'

const propTypes = {
  search: PropTypes.func,
  things: PropTypes.object,
}

class Things extends React.Component {
  componentDidMount() {
    const meshbluConfig = getMeshbluConfig()
    const query = {
      owner: meshbluConfig.uuid,
    }
    const projection = {
      uuid: true,
      name: true,
      online: true,
      type: true,
      logo: true,
      meshblu: true,
    }

    this.props.search({ query, projection }, meshbluConfig)
  }

  render() {
    return <ThingsLayout things={this.props.things} />
  }
}

Things.propTypes = propTypes

const mapStateToProps = ({ things }) => {
  return { things }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query, meshbluConfig) => dispatch(search(query, meshbluConfig)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Things)
