import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import AppRoutes from './config/routes'
import reducers from './reducers/'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger(),
  routerMiddleware(browserHistory)
)

const store   = createStore(reducers, createStoreWithMiddleware)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <AppRoutes history={history} />
  </Provider>,
  document.getElementById('app')
)
