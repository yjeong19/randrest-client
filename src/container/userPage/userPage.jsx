import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
const Cookies = require('js-cookie');

export function PrivateRoute({ component: Component, ...rest}){
  return(
    <Route
      {...rest}
      render={props =>
        Cookies.get('isAuth') == 'true' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              // state: { from: props.location }
            }} />
          )
        } />
      )
    };

class userPage extends Component {
  render(){
    return(
      <div>
        <h1>User Page</h1>
      </div>
    )
  }
};

export default userPage;
