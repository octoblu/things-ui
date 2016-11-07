import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Input from 'zooid-input'

import {
  addThingsToApplication,
  removeThingsFromApplication,
} from '../../actions/things'

import GroupList from '../GroupList'

import styles from './styles.css'

const propTypes = {
  applicationDevices: PropTypes.array,
  dispatch: PropTypes.func,
  selectedThings: PropTypes.array,
  selectedGroups: PropTypes.array,
}

class GroupManager extends React.Component {
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
    const { applicationDevices, selectedThings, selectedGroups } = this.props

    if (_.isEmpty(selectedThings)) return null

    return (
      <div className={styles.root}>
        <Input
          placeholder="Add Group"
          onKeyDown={this.detectKeyDownHandler.bind(this)}
        />

        <GroupList
          groups={applicationDevices}
          selectedGroups={selectedGroups}
          onUpdateApplicationDevices={this.handleUpdateApplicationDevices.bind(this)}
        />
      </div>
    )
  }
}

GroupManager.propTypes = propTypes

const mapStateToProps = ({ groups, things }) => {
  const { selectedGroups, selectedThings } = things
  const applicationDevices = groups.devices

  return { applicationDevices, selectedGroups, selectedThings }
}

export default connect(mapStateToProps)(GroupManager)
