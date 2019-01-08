import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { addAuth } from '../../redux/actions/addAuth';
const Cookies = require('js-cookie');

class userPage extends Component {
  constructor(props){
    super(props);

    //bind events
    this.AuthButton = this.AuthButton.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  };

  componentDidUpdate(){
    console.log(this.props);
  }

  AuthButton(){
    return(
      <div>{
        Cookies.get('isAuth') == 'true' ? (
          <p>
            Welcome! <button onClick={this.logoutUser}>Sign out</button>
          </p>
        ) : (
          <p>You are not logged in.</p>
        )
      }</div>
    )
  };

  logoutUser(){
    Cookies.set('isAuth', false);
    Cookies.set('token', '');
    console.log(document.cookie);
    this.props.addAuth(Cookies.get('isAuth'));
    return(
      <Route exact path = '/' />
    )
  }

  render(){
    if(this.props.isAuth == 'false') {
      return <Redirect to='/login' />
    }
    console.log(this.props);
    return(
      <div>
        <h1>Protected</h1>
        <div>{this.AuthButton()}</div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  addAuth: (auth) => dispatch(addAuth(auth)),
});

const mapStateToProps = ((state, ownProps) => {
  return {
    isAuth: state.authReducer.isAuth,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userPage);
