import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {browserHistory, Route, Router} from 'react-router';

import {Main} from './app/views/main';
import AboutComponent from './app/views/about';

import './index.scss';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Main}/>
    <Route path='/about' component={AboutComponent}/>
  </Router>,
  document.getElementById('root')
);
