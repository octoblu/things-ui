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
  showDeleteDialog,
} from '../actions/things'

import {
  dismissGroupDialog,
  removeGroupFilters,
  selectGroupFilters,
  showGroupDialog,
} from '../actions/groups'

import { getMeshbluConfig } from '../services/auth-service'

import ThingsLayout from '../components/ThingsLayout'

const propTypes = {
  dispatch: PropTypes.func,
  groups: PropTypes.object,
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
      type: {
        $ne: 'octoblu:user',
      },
    }

    const projection = {
      devices: true,
      logo: true,
      meshblu: true,
      name: true,
      octoblu: true,
      online: true,
      type: true,
      uuid: true,
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

  handleGroupDialogShow = () => {
    const { selectedThings } = this.props.things
    this.props.dispatch(showGroupDialog(selectedThings))
  }

  handleGroupDialogDismiss = () => {
    this.props.dispatch(dismissGroupDialog())
  }

  handleUpdateGroups = () => {
    console.log('onUpdateGroups')
  }

  handleUpdateGroupFilters = ({group, selected}) => {
    if (selected) return this.props.dispatch(removeGroupFilters(group))
    return this.props.dispatch(selectGroupFilters(group))

  }

  handleThingSelectionToggle = (thingUuid, selected) => {
    if (selected) return this.props.dispatch(selectThing(thingUuid))
    return this.props.dispatch(unselectThing(thingUuid))
  }

  render() {
    return (
      <ThingsLayout
        groups={this.props.groups}
        onClearSelection={this.handleClearSelection}
        onDeleteDialogShow={this.handleDeleteDialogShow}
        onDeleteDialogDismiss={this.handleDeleteDialogDismiss}
        onDeleteSelection={this.handleDeleteSelection}
        onGroupDialogShow={this.handleGroupDialogShow}
        onGroupDialogDismiss={this.handleGroupDialogDismiss}
        onGroupSelection={this.handleGroupSelection}
        onThingSelection={this.handleThingSelectionToggle}
        onUpdateGroupFilters={this.handleUpdateGroupFilters}
        onUpdateGroups={this.handleUpdateGroups}
        showGroupDialog={this.props.groups.showGroupDialog}
        things={this.props.things}
      />
    )
  }
}

Things.propTypes = propTypes

const mapStateToProps = ({ groups, things }) => {
  return { groups, things }
}

export default connect(mapStateToProps)(Things)
