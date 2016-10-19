import { createAction } from 'redux-act'

const selectThing   = createAction('/thing/selection/add')
const unselectThing = createAction('/thing/selection/remove')

export {
  selectThing,
  unselectThing,
}
