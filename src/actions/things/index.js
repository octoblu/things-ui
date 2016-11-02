import Promise from 'bluebird'
import { createAction } from 'redux-act'
import { unregister } from 'redux-meshblu'

import { getMeshbluConfig } from '../../services/auth-service'

const clearSelectedThings         = createAction('/things/selection/clear')
const deleteSelectedThings        = createAction('/things/selection/delete')
const deleteSelectedThingsSuccess = createAction('/things/selection/delete/success')
const deleteSelectedThingsFailure = createAction('/things/selection/delete/failure')
const dismissDeleteDialog         = createAction('/things/selection/delete/dialog/dismiss')
const showDeleteDialog            = createAction('/things/selection/delete/dialog/show')
const dismissTagDialog            = createAction('/things/selection/tag/dialog/dismiss')
const showTagDialog               = createAction('/things/selection/tag/dialog/show')
const tagSelectedThings           = createAction('/things/selection/tag')

const deleteSelection = (selectedThings) => {
  return (dispatch) => {
    const meshbluConfig = getMeshbluConfig()
    dispatch(deleteSelectedThings(selectedThings))

    return Promise.each(selectedThings, ({ uuid }) => dispatch(unregister({ uuid, meshbluConfig })))
      .then(() => dispatch(deleteSelectedThingsSuccess()))
      .catch(err => dispatch(deleteSelectedThingsFailure(err)))
  }
}

export {
  clearSelectedThings,
  deleteSelection,
  deleteSelectedThings,
  deleteSelectedThingsSuccess,
  deleteSelectedThingsFailure,
  dismissDeleteDialog,
  dismissTagDialog,
  showDeleteDialog,
  showTagDialog,
  tagSelectedThings,
}
