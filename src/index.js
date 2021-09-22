import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/argon-dashboard-react.scss';
import './app.css';
import { Provider } from 'react-redux';
import store from './store/index';

import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth.js';

import Amplify, { Auth } from 'aws-amplify';
import amplify from './aws-exports';

Amplify.configure(amplify);

Auth.configure({
  oauth: amplify.auth,
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/" render={(props) => <AdminLayout {...props} />} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
