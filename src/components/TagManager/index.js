import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Input from 'zooid-input'

import TagList from '../TagList'
import styles from './styles.css'

const propTypes = {
  applications: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedDevices: PropTypes.array.isRequired,
  selectedDeviceTags: PropTypes.array.isRequired,
}

const defaultProps = {}


class TagManager extends React.Component {
  detectKeyDownHandler(event) {
    console.log('Event', event)
  }

  render() {
    const { applications, selectedDevices, selectedDeviceTags } = this.props

    if (_.isEmpty(selectedDevices)) return null

    return (
      <div className={styles.root}>
        <Input
          placeholder="Add Tag" onKeyDown={this.detectKeyDownHandler.bind(this)}
        />
        <TagList tags={applications} selectedTags={selectedDeviceTags} />
      </div>
    )
  }
}

TagManager.propTypes    = propTypes
TagManager.defaultProps = defaultProps

const mapStateToProps = ({ things }) => {
  const { applications, devices, selectedThings } = things
  const selectedDevices = _.intersectionBy(devices, selectedThings, 'uuid')
  const selectedDeviceTags = null

  console.log('Selected Devices', selectedDevices);
  console.log('Selected Devices', selectedDevices);
  return { applications, selectedDevices, selectedDeviceTags }
}

export default connect(mapStateToProps)(TagManager)
