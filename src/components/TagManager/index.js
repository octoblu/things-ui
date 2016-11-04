import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Input from 'zooid-input'

import {
  addThingsToApplication,
  removeThingsFromApplication,
} from '../../actions/things'

import TagList from '../TagList'

import styles from './styles.css'

const propTypes = {
  applicationDevices: PropTypes.array,
  dispatch: PropTypes.func,
  selectedThings: PropTypes.array,
  selectedApplications: PropTypes.array,
}

class TagManager extends React.Component {
  detectKeyDownHandler(event) {
    console.log('Event', event)
  }

  handleUpdateApplicationDevices({ applicationUuid, inApplication }) {
    const { dispatch } = this.props

    if (inApplication) {
      return dispatch(removeThingsFromApplication(applicationUuid))
    }

    return dispatch(addThingsToApplication(applicationUuid))
  }

  render() {
    const { applicationDevices, selectedThings, selectedApplications } = this.props

    if (_.isEmpty(selectedThings)) return null

    return (
      <div className={styles.root}>
        <Input
          placeholder="Add Tag"
          onKeyDown={this.detectKeyDownHandler.bind(this)}
        />

        <TagList
          applications={applicationDevices}
          selectedApplications={selectedApplications}
          onUpdateApplicationDevices={this.handleUpdateApplicationDevices.bind(this)}
        />
      </div>
    )
  }
}

TagManager.propTypes = propTypes

const mapStateToProps = ({ applications, things }) => {
  const { selectedApplications, selectedThings } = things
  const applicationDevices = applications.devices

  return { applicationDevices, selectedApplications, selectedThings }
}

export default connect(mapStateToProps)(TagManager)
