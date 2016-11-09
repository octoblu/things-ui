import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { register } from 'redux-meshblu'
import Input from 'zooid-input'

import CreateGroupButton from '../CreateGroupButton'

import { getMeshbluConfig } from '../../services/auth-service'

import {
  addSelectedThingsToGroup,
  removeSelectedThingsFromGroup,
    updateGroupFilter,
} from '../../actions/groups'

import GroupList from '../GroupList'

import styles from './styles.css'

const propTypes = {
  groups: PropTypes.object,
  dispatch: PropTypes.func,
  selectedThings: PropTypes.array,
}

class GroupManager extends React.Component {
  registerGroup(name) {
    const { dispatch, selectedThings } = this.props
    const meshbluConfig = getMeshbluConfig()
    const ownerUuid = meshbluConfig.uuid
    const body = {
      description: '',
      devices: selectedThings,
      name,
      owner: ownerUuid,
      type: 'octoblu:group',
      meshblu: {
        whitelists: {
          configure: {
            update: [{ uuid: ownerUuid }],
          },
          discover: {
            view: [{ uuid: ownerUuid }],
          },
        },
      },
    }

    return dispatch(register({ body, meshbluConfig }))
  }

  handleUpdateGroupDevices({ groupUuid, inGroup }) {
    const { dispatch, selectedThings } = this.props

    if (inGroup) return dispatch(removeSelectedThingsFromGroup({ groupUuid, selectedThings }))
    return dispatch(addSelectedThingsToGroup({ groupUuid, selectedThings }))
  }

  filterGroupsByName(name) {
    const { devices } = this.props.groups

    if (_.isEmpty(name)) return devices

    const nameFilter = name.trim().toLowerCase()

    return _.filter(devices, (device) => {
      const deviceName = _.get(device, 'name')

      if (_.isEmpty(deviceName)) return false

      return deviceName.toLowerCase().includes(nameFilter)
    })
  }

  isCreateGroupButtonVisible(filterName) {
    const { devices } = this.props.groups
    const deviceNames = _.map(devices, device => device.name.toLowerCase())

    if (_.isEmpty(filterName)) return false
    if (!_.includes(deviceNames, filterName.toLowerCase().trim())) return true

    return false
  }

  render() {
    const { dispatch, groups, selectedThings } = this.props
    const { filterValue } = groups

    if (_.isEmpty(selectedThings)) return null

    return (
      <div className={styles.root}>
        <Input
          placeholder="Add Group"
          value={filterValue}
          onChange={({ target }) => dispatch(updateGroupFilter(target.value))}
        />

        <CreateGroupButton
          visible={this.isCreateGroupButtonVisible(filterValue)}
          nameFilter={filterValue}
          onCreate={() => this.registerGroup(filterValue)}
        />

        <GroupList
          groups={this.filterGroupsByName(filterValue)}
          selectedThings={selectedThings}
          onUpdateGroupDevices={this.handleUpdateGroupDevices.bind(this)}
        />
      </div>
    )
  }
}

GroupManager.propTypes = propTypes

const mapStateToProps = ({ groups, things }) => {
  const { selectedThings } = things

  return { groups, selectedThings }
}

export default connect(mapStateToProps)(GroupManager)
