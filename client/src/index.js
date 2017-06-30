import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Login from './js/components/login';
import Home from './js/components/pages/home';
import Groups from './js/components/pages/groups';
import AddUser from './js/components/pages/addUser2';
import SignOut from './js/components/pages/signOut';
import './index.scss';

ReactDOM.render(
  <Router history={ browserHistory }>
      <Route path="/" component={ Login } />
      <Route path= "home" component={ Home } />
      <Route path= "group" component={ Groups } />
      <Route path= "addUser" component={ AddUser } />
      <Route path= "signOut" component={ SignOut } />
  </Router>,
  document.getElementById('main-container')
);
