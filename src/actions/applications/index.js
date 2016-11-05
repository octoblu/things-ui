import { createAction } from 'redux-act'

const dismissApplicationDialog = createAction('/things/selection/dialog/application/dismiss')
const showApplicationDialog = createAction('/things/selection/dialog/application/show')

export {
  dismissApplicationDialog,
  showApplicationDialog,
}
