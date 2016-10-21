import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Input from 'zooid-input  '

import TagList from '../TagList'
import styles from './styles.css'

const propTypes = {
  availableTags: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedDevices: PropTypes.array.isRequired,
  selectedDeviceTags: PropTypes.array.isRequired,
}

const defaultProps = {}


class TagManager extends React.Component {
  detectKeyDownHandler (event) {
    console.log('Event', event)
  }
  render() {
    const { availableTags, selectedDevices, selectedDeviceTags } = this.props

    if (_.isEmpty(selectedDevices)) return null

    return (
      <div className={styles.root}>
        <Input
          placeholder="Add Tag" onKeyDown={this.detectKeyDownHandler.bind(this)}
        />
        <TagList tags={availableTags} selectedTags={selectedDeviceTags} />
      </div>
    )
  }
}

TagManager.propTypes    = propTypes
TagManager.defaultProps = defaultProps

const mapStateToProps = ({ things }) => {
  const { devices, selectedThings } = things
  const availableTags = _(devices)
    .map(device => device.octoblu.tags)
    .flatten()
    .uniq()
    .compact()
    .value()

  const selectedDevices = _.intersectionBy(devices, selectedThings, 'uuid')
  let selectedDeviceTags = _(selectedDevices)
    .map('octoblu.tags')
    .compact()
    .value()

  selectedDeviceTags = _.spread(_.intersection)(selectedDeviceTags)

  return { availableTags, selectedDevices, selectedDeviceTags }
}

export default connect(mapStateToProps)(TagManager)
