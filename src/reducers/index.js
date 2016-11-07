import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import groups from './groups'
import thing from './thing'
import things from './things'

const rootReducer = combineReducers({
  groups,
  routing: routerReducer,
  thing,
  things,
})

export default rootReducer
