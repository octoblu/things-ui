import { createAction } from 'redux-act'

const dismissGroupDialog = createAction('/things/selection/dialog/group/dismiss')
const showGroupDialog = createAction('/things/selection/dialog/group/show')

export {
  dismissGroupDialog,
  showGroupDialog,
}
