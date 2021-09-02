import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch, BrowserRouter, Router} from 'react-router-dom';

import './index.css';
import App from './App';
import User from './User';
import Visit from './Visit';

function Routing() {
  return (
    <>
      <Router>
      <Route path="/" exact  component={App} />
      <Route path="/user"  component={User} />
      <Route path="/visit"  component={Visit} />
    </Router>
    </>
  )
}



ReactDOM.render(
    Routing,
  document.getElementById('root')
);

