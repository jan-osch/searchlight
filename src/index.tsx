import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

import './resources/index.scss'

import {Main} from './app/views/main'
import AboutComponent from './app/views/about'
import {ROUTES} from './app/routes'


ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path={ROUTES.MAIN} component={Main as any}/>

      <Route path={ROUTES.ABOUT} component={AboutComponent}/>
    </Switch>
  </Router>,
  document.getElementById('root')
)
