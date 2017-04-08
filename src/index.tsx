import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {browserHistory, Route, Router} from 'react-router';

import {Main} from './app/main';

import './index.scss';
import AboutComponent from './app/about';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Main}/>
    <Route path='/about' component={AboutComponent}/>
  </Router>,
  document.getElementById('root')
);
