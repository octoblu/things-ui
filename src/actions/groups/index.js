import { createAction } from 'redux-act'

const addSelectedThingsToGroup      = createAction('/groups/add/things')
const removeSelectedThingsFromGroup = createAction('/groups/remove/things')
const dismissGroupDialog            = createAction('/groups/dismiss/dialog')
const selectGroupFilters            = createAction('/groups/add/filter')
const removeGroupFilters            = createAction('/groups/remove/filter')
const showGroupDialog               = createAction('/groups/show/dialog')

export {
  addSelectedThingsToGroup,
  removeSelectedThingsFromGroup,
  dismissGroupDialog,
  selectGroupFilters,
  removeGroupFilters,
  showGroupDialog,
}
