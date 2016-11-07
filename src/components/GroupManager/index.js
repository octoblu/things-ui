import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Input from 'zooid-input'

import {
  addThingsToGroup,
  removeThingsFromGroup,
} from '../../actions/things'

import GroupList from '../GroupList'

import styles from './styles.css'

const propTypes = {
  groupDevices: PropTypes.array,
  dispatch: PropTypes.func,
  selectedThings: PropTypes.array,
  selectedGroups: PropTypes.array,
}

class GroupManager extends React.Component {
  detectKeyDownHandler(event) {
    console.log('Event', event)
  }

  handleUpdateGroupDevices({ groupUuid, inGroup }) {
    const { dispatch } = this.props

    if (inGroup) {
      return dispatch(removeThingsFromGroup(groupUuid))
    }

    return dispatch(addThingsToGroup(groupUuid))
  }

  render() {
    const { groupDevices, selectedThings, selectedGroups } = this.props

    if (_.isEmpty(selectedThings)) return null

    return (
      <div className={styles.root}>
        <Input
          placeholder="Add Group"
          onKeyDown={this.detectKeyDownHandler.bind(this)}
        />

        <GroupList
          groups={groupDevices}
          selectedGroups={selectedGroups}
          onUpdateGroupDevices={this.handleUpdateGroupDevices.bind(this)}
        />
      </div>
    )
  }
}

GroupManager.propTypes = propTypes

const mapStateToProps = ({ groups, things }) => {
  const { selectedGroups, selectedThings } = things
  const groupDevices = groups.devices

  return { groupDevices, selectedGroups, selectedThings }
}

export default connect(mapStateToProps)(GroupManager)
