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
    console.log(this.props);
    return(
      <div>
        <h1>Protected</h1>
        <button>Log Out</button>
      </div>
    )
  }
};

export default userPage;
