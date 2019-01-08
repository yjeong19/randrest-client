import React, { Component } from 'react';
import { registerUser, loginUser, userInfo } from '../../helpers/user_routes';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addAuth } from '../../redux/actions/addAuth';
const Cookies = require('js-cookie');


class signupForm extends Component {
  constructor(props){
    super(props);
    this.state= {
      email: '',
      password: '',
      password2: '',
      name: '',
      redirectToReferer: false,
    }
    //bind events
    this.renderSignUp = this.renderSignUp.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  };


  renderLogin(){
    return(
      <form>
        <div className='form-group'>
          <label for="exampleInputEmail1">Email address</label>
          <input onChange={this.handleInput} type="email" class="form-control" id="email" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input onChange={this.handleInput} type="password" class="form-control" id="password" placeholder="Password" />
        </div>
          <button onClick={this.handleLoginSubmit} id="loginSubmit" type="submit" class="btn btn-primary">Submit</button>
      </form>
    )
  }

  renderSignUp(){
    return(
      <form>
        <div className='form-group'>
          <label for="exampleInputEmail1">Email address</label>
          <input id="email" onChange={this.handleInput} type="email" className="email form-control" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="name">Username</label>
          <input onChange={this.handleInput} className="password 2 form-control" id="name" placeholder="Username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input onChange={this.handleInput} type="password" className="password form-control" id="password" placeholder="Password" />
        </div>
        <div class="form-group">
          <label for="password2">Re Enter Password</label>
          <input onChange={this.handleInput} type="password" className="password 2 form-control" id="password2" placeholder="Password" />
        </div>
        <button onClick={this.handleRegisterSubmit} id="registerSubmit" type="submit" class="btn btn-primary">Submit</button>
      </form>
    )
  }

  handleInput(e){
    this.setState({[e.target.id] : e.target.value })
  }


//refactor submit button later
  handleRegisterSubmit(e){
    e.preventDefault();
    registerUser(this.state)
    .then(res => {
      console.log(res.data);
      Cookies.remove('token');
      Cookies.remove('isAuth');
      Cookies.set('token', res.data.token, {expires: 1});
      Cookies.set('isAuth', res.data.success, {expires: 1});
      this.setState({redirectToReferer: true});
    })
    .then(userInfo(Cookies.get('token')))
    .catch(err => {
      console.log(err);
    })
    // userInfo();
  };

  handleLoginSubmit(e){
    e.preventDefault();
    console.log(e.target.id);
    loginUser(this.state)
    .then(res => {
      Cookies.remove('token');
      Cookies.remove('isAuth');
      Cookies.set('token', res.data.token, {expires: 1});
      Cookies.set('isAuth', res.data.success, {expires: 1});
      this.setState({redirectToReferer: true});
      this.props.addAuth(Cookies.get('isAuth'));
    })
    .then(userInfo(Cookies.get('token')))
    .catch(err => {
      console.log(err);
    })
  }

  componentDidUpdate(){
    console.log(this.props.state.authReducer);
  }

  render(){
    if(this.props.isAuth == 'true') {
      return <Redirect to='/protected' />
    }
    return(
      <div>
        <div>{this.renderLogin()}</div>
        <div>{this.renderSignUp()}</div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  addAuth: (auth) => dispatch(addAuth(auth)),
});

const mapStateToProps = ((state, ownProps) => {
  return {
    state,
    isAuth: state.authReducer.isAuth,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(signupForm);
