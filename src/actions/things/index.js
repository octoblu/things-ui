import { createAction } from 'redux-act'

const clearSelectedThings  = createAction('/things/selection/clear')
const deleteSelectedThings = createAction('/things/selection/delete')
const tagSelectedThings    = createAction('/things/selection/tag')

export {
  clearSelectedThings,
  deleteSelectedThings,
  tagSelectedThings,
}
