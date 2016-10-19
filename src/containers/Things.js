import Promise from 'bluebird'
import pluralize from 'pluralize'
import React, { PropTypes } from 'react'
import { search, unregister } from 'redux-meshblu'
import { connect } from 'react-redux'

import { selectThing, unselectThing } from '../actions/thing'
import { clearSelectedThings } from '../actions/things'
import { getMeshbluConfig } from '../services/auth-service'

import ThingsLayout from '../components/ThingsLayout'

const propTypes = {
  dispatch: PropTypes.func,
  things: PropTypes.object,
}

class Things extends React.Component {
  componentDidMount() {
    this.fetchThings()
  }

  fetchThings() {
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

    this.props.dispatch(search({ query, projection }, meshbluConfig))
  }

  handleClearSelection = () => {
    return this.props.dispatch(clearSelectedThings())
  }

  handleDeleteSelection = () => {
    const { selectedThings }  = this.props.things
    const selectedThingsCount = selectedThings.length
    const confirmationMessage = `Are you sure you want to delete ${selectedThingsCount} ${pluralize('thing', selectedThingsCount)}`
    const meshbluConfig       = getMeshbluConfig()

    if (confirm(confirmationMessage)) {
      Promise.each(selectedThings, (selectedThingUuid) => this.props.dispatch(unregister(selectedThingUuid, meshbluConfig)))
      .then((data) => {
        this.fetchThings()
      })
    }
  }

  handleTagSelection = () => {
    console.log('handleTagSelection');
  }

  handleThingSelectionToggle = (thingUuid, selected) => {
    if (selected) return this.props.dispatch(selectThing(thingUuid))

    return this.props.dispatch(unselectThing(thingUuid))
  }

  render() {
    return (
      <ThingsLayout
        onClearSelection={this.handleClearSelection}
        onDeleteSelection={this.handleDeleteSelection}
        onTagSelection={this.handleTagSelection}
        onThingSelection={this.handleThingSelectionToggle}
        things={this.props.things}
      />
    )
  }
}

Things.propTypes = propTypes

const mapStateToProps = ({ things }) => {
  return { things }
}

export default connect(mapStateToProps)(Things)
