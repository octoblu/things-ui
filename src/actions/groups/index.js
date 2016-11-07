import { createAction } from 'redux-act'

const dismissGroupDialog = createAction('/things/selection/dialog/application/dismiss')
const showGroupDialog = createAction('/things/selection/dialog/application/show')

export {
  dismissGroupDialog,
  showGroupDialog,
}
