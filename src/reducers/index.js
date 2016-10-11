import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import thing from './thing'
import things from './things'

const rootReducer = combineReducers({
  routing: routerReducer,
  thing,
  things,
})

export default rootReducer
