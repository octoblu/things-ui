import _ from 'lodash'
import React, { PropTypes } from 'react'
import { search } from 'redux-meshblu'
import { connect } from 'react-redux'

import { getMeshbluConfig } from '../services/auth-service'

import ThingList from '../components/ThingList'

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
    const { devices, error, fetching } = this.props.things

    if (fetching) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (_.isEmpty(devices)) return <div>No Things Found</div>


    return (
      <ThingList things={devices} />
    )
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
