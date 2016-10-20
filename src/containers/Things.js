import pluralize from 'pluralize'
import React, { PropTypes } from 'react'
import { search, unregister } from 'redux-meshblu'
import { connect } from 'react-redux'

import { selectThing, unselectThing } from '../actions/thing'
import {
  clearSelectedThings,
  deleteSelectedThings,
  deleteSelection,
  dismissDeleteDialog,
  showDeleteDialog
} from '../actions/things'
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
      octoblu: true,
    }

    this.props.dispatch(search({ query, projection }, meshbluConfig))
  }

  handleClearSelection = () => {
    return this.props.dispatch(clearSelectedThings())
  }

  handleDeleteSelection = () => {
    const { dispatch, things } = this.props

    return dispatch(deleteSelection(things.selectedThings)).then(() => {
      dispatch(dismissDeleteDialog())
    })
  }

  handleDeleteDialogShow = () => {
    this.props.dispatch(showDeleteDialog())
  }

  handleDeleteDialogDismiss = () => {
    this.props.dispatch(dismissDeleteDialog())
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
        onDeleteDialogShow={this.handleDeleteDialogShow}
        onDeleteDialogDismiss={this.handleDeleteDialogDismiss}
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
