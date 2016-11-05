import Promise from 'bluebird'
import { createAction } from 'redux-act'
import { unregister } from 'redux-meshblu'

import { getMeshbluConfig } from '../../services/auth-service'

const addThingsToApplication      = createAction('/things/selection/add/tag')
const removeThingsFromApplication = createAction('/things/selection/remove/tag')
const clearSelectedThings         = createAction('/things/selection/clear')
const deleteSelectedThings        = createAction('/things/selection/delete')
const deleteSelectedThingsSuccess = createAction('/things/selection/delete/success')
const deleteSelectedThingsFailure = createAction('/things/selection/delete/failure')
const dismissDeleteDialog         = createAction('/things/selection/dialog/delete/dismiss')
const showDeleteDialog            = createAction('/things/selection/dialog/delete/show')
const updateSelectedTags          = createAction('/things/selection/update/tag')
const updateSelectedTagsSuccess   = createAction('/things/selection/update/tag/success')
const updateSelectedTagsFailure   = createAction('/things/selection/update/tag/failure')

const deleteSelection = (selectedThings) => {
  return (dispatch) => {
    const meshbluConfig = getMeshbluConfig()
    dispatch(deleteSelectedThings(selectedThings))

    return Promise.each(selectedThings, uuid => dispatch(unregister({ uuid, meshbluConfig })))
      .then(() => dispatch(deleteSelectedThingsSuccess()))
      .catch(err => dispatch(deleteSelectedThingsFailure(err)))
  }
}

// const updateTags = () => {
//   return (dispatch) => {
//     const meshbluConfig = getMeshbluConfig()
//     dispatch(updateSelectedTags())
//
//
//     return Promise.each(selectedThings, uuid => dispatch(update({ uuid, meshbluConfig })))
//       .then(() => dispatch(updateSelectedTagsSuccess()))
//       .catch(err => dispatch(updateSelectedTagsFailure(err)))
//   }
// }

export {
  addThingsToApplication,
  removeThingsFromApplication,
  clearSelectedThings,
  deleteSelection,
  deleteSelectedThings,
  deleteSelectedThingsSuccess,
  deleteSelectedThingsFailure,
  dismissDeleteDialog,
  showDeleteDialog,
  updateSelectedTags,
  updateSelectedTagsSuccess,
  updateSelectedTagsFailure,
}
