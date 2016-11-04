import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import applications from './applications'
import thing from './thing'
import things from './things'

const rootReducer = combineReducers({
  applications,
  routing: routerReducer,
  thing,
  things,
})

export default rootReducer
