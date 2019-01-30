import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const Cookies = require('js-cookie');

export const PrivateRoute = ({ component: Component, props, ...rest }) => (
  <Route {...rest} render={(props) => (
    // 1 === 1
      // ?
      <Component ComponentDidMount={(rest)}/>
      // : <Redirect to='/login' componentDidMount={('login')}/>
    )} />
  );
