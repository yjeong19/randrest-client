import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
const Cookies = require('js-cookie');

class userPage extends Component {
  render(){
    return(
      <div>
        <h1>Protected</h1>
      </div>
    )
  }
};

export default userPage;
