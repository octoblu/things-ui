import _ from 'lodash'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Input from 'zooid-input'

import TagList from '../TagList'
import styles from './styles.css'

const propTypes = {
  applicationDevices: PropTypes.array.isRequired,
  selectedThings: PropTypes.array.isRequired,
  selectedApplications: PropTypes.array.isRequired,
}

class TagManager extends React.Component {
  detectKeyDownHandler(event) {
    console.log('Event', event)
  }

  render() {
    const { applicationDevices, selectedThings, selectedApplications } = this.props

    if (_.isEmpty(selectedThings)) return null

    return (
      <div className={styles.root}>
        <Input
          placeholder="Add Tag" onKeyDown={this.detectKeyDownHandler.bind(this)}
        />
        <TagList applications={applicationDevices} selectedApplications={selectedApplications} />
      </div>
    )
  }
}

TagManager.propTypes = propTypes

const mapStateToProps = ({ things }) => {
  const { devices, selectedApplications, selectedThings } = things
  const applicationDevices = _.filter(devices, { type: 'octoblu:application' })

  return { applicationDevices, selectedApplications, selectedThings }
}

export default connect(mapStateToProps)(TagManager)
