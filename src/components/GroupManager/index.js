import _ from 'lodash'
import React, { PropTypes } from 'react'
import AddIcon from 'react-icons/lib/md/add'
import { connect } from 'react-redux'
import { register } from 'redux-meshblu'
import Button from 'zooid-button'
import Input from 'zooid-input'

import CreateGroupButton from '../CreateGroupButton'

import {
  addSelectedThingsToGroup,
  removeSelectedThingsFromGroup,
  updateGroupFilter,
} from '../../actions/groups'

import GroupList from '../GroupList'

import styles from './styles.css'

const propTypes = {
  creating: PropTypes.bool,
  filterValue: PropTypes.string,
  onCreateGroup: PropTypes.func,
  onUpdateGroups: PropTypes.func,
  updateGroupFilter: PropTypes.func,
}

class GroupManager extends React.Component {

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
    if (_.isEmpty(devices)) return false

    const deviceNames = _.map(devices, device => device.name.toLowerCase())

    if (_.isEmpty(filterName)) return false
    if (!_.includes(deviceNames, filterName.toLowerCase().trim())) return true

    return false
  }

  render() {
    const { creating, filterValue, onCreateGroup, updateGroupFilter } = this.props

    if (_.isEmpty(selectedThings)) return null
    if (_.isEmpty(devices)) return <GroupManagerEmptyState />

    return (
      <div className={styles.root}>
        {/* <Input
          placeholder="Filter Groups"
          value={filterValue}
          onChange={({ target }) => dispatch(updateGroupFilter(target.value))}
        /> */}

        <Button kind="hollow-primary" block>
          <AddIcon />
          Create Group
        </Button>
        {/* <CreateGroupButton
          visible={!_.isEmpty(devices)}
          nameFilter={filterValue}
          onCreate={() => this.registerGroup(filterValue)}
        /> */}

        <GroupList
          groups={this.filterGroupsByName(filterValue)}
          selectedThings={selectedThings}
          onUpdateGroupDevices={this.handleUpdateGroupDevices.bind(this)}
        />

        <Button
          onClick={onUpdateGroups}
          kind="primary"
          disabled={updatingGroups}
        >
          Update
        </Button>
        <Button onClick={onGroupDialogDismiss}>Cancel</Button>
      </div>)
  }
}

GroupManager.propTypes = propTypes

const mapStateToProps = ({ groups, things }) => {
  const { selectedThings } = things

  return { groups, selectedThings }
}

export default connect(mapStateToProps)(GroupManager)
