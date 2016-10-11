import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import App from '../containers/App'
import Home from '../containers/Home'
import Thing from '../containers/Thing'
import Things from '../containers/Things'
import NotFound from '../components/NotFound'
import { storeAuthenticationAndRedirect } from '../services/auth-service'

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="auth/callback" onEnter={storeAuthenticationAndRedirect} />
        <IndexRoute component={Things} />
        <Route path="things" component={Things} />
        <Route path="things/:deviceUuid" component={Thing} />
      </Route>

      <Route path="home" component={Home} />
      <Route path="*" status={404} component={NotFound} />
    </Router>
  )
}
