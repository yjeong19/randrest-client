import React, { Component } from 'react';
import { registerUser, loginUser, userInfo } from '../../helpers/user_routes';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addAuth } from '../../redux/actions/addAuth';
import './style.css';
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
      payload: {},
      reg_or_login: 'login',
    }
    //bind events
    this.renderSignUp = this.renderSignUp.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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
      Cookies.remove('token');
      Cookies.remove('isAuth');
      Cookies.set('token', res.data.token, {expires: 1});
      Cookies.set('isAuth', res.data.success, {expires: 1});
      this.setState({redirectToReferer: true});
      this.setState({
        payload: {
          token: Cookies.get('token'),
          auth: Cookies.get('isAuth'),
          username: res.data.payload.name,
          user_id: res.data.payload.id,
        }
      });
      this.props.addAuth(this.state.payload)
    })
    .then(userInfo(Cookies.get('token')))
    .catch(err => {
      console.log(err);
    })
    // userInfo();
  };

  handleLoginSubmit(e){
    e.preventDefault();
    loginUser(this.state)
    .then(res => {
      Cookies.remove('token');
      Cookies.remove('isAuth');
      Cookies.set('token', res.data.token, {expires: 1});
      Cookies.set('isAuth', res.data.success, {expires: 1});
      this.setState({redirectToReferer: true});
      this.setState({
        payload: {
          token: Cookies.get('token'),
          auth: Cookies.get('isAuth'),
          username: res.data.payload.name,
          user_id: res.data.payload.id,
        }
      });
      this.props.addAuth(this.state.payload);
      // this.props.history.push('/protected');
    })
    .then(userInfo(Cookies.get('token')))
    .catch(err => {
      console.log(err);
    })
  }

  handleRegister(){
    if(this.state.reg_or_login == 'login'){
      this.setState({
        reg_or_login: 'register',
      })}else{
      this.setState({
        reg_or_login: 'login'
      })
    }
  }

  render(){
    if(this.props.isAuth == 'true') {
      return <Redirect to='/protected' />
    }
    return(
      <div>
        {this.state.reg_or_login == 'login' ? <div>{this.renderLogin()}</div> : <div>{this.renderSignUp()}</div>}
        {this.state.reg_or_login == 'login' ? <p>Don't have an acccount? <span className='log_or_reg' onClick={this.handleRegister}>Click Here to make one</span></p> : <p>Already have an acccount? <span className='log_or_reg' onClick={this.handleRegister}>Click Here to sign in</span></p>}
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  addAuth: (payload) => dispatch(addAuth(payload)),
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
