import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Input from 'zooid-input'

import {
  addSelectedThingsToGroup,
  removeSelectedThingsFromGroup,
} from '../../actions/groups'

import GroupList from '../GroupList'

import styles from './styles.css'

const propTypes = {
  groups: PropTypes.array,
  dispatch: PropTypes.func,
  selectedThings: PropTypes.array,
  selectedGroups: PropTypes.array,
}

class GroupManager extends React.Component {
  detectKeyDownHandler(event) {
    console.log('Event', event)
  }

  handleUpdateGroupDevices({ groupUuid, inGroup }) {
    const { dispatch, selectedThings } = this.props

    if (inGroup) return dispatch(removeSelectedThingsFromGroup({ groupUuid, selectedThings }))
    return dispatch(addSelectedThingsToGroup({ groupUuid, selectedThings }))
  }

  render() {
    const { groups, selectedThings } = this.props

    if (_.isEmpty(selectedThings)) return null

    return (
      <div className={styles.root}>
        <Input
          placeholder="Add Group"
          onKeyDown={this.detectKeyDownHandler.bind(this)}
        />

        <GroupList
          groups={groups}
          selectedThings={selectedThings}
          onUpdateGroupDevices={this.handleUpdateGroupDevices.bind(this)}
        />
      </div>
    )
  }
}

GroupManager.propTypes = propTypes

const mapStateToProps = ({ groups, things }) => {
  const { devices } = groups
  const { selectedThings } = things

  return { groups: devices, selectedThings }
}

export default connect(mapStateToProps)(GroupManager)
