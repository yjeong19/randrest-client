import React, { Component } from 'react';
import { registerUser, loginUser, userInfo } from '../../helpers/user_routes';

class signupForm extends Component {
  constructor(props){
    super(props);
    this.state= {
      email: '',
      password: '',
      password2: '',
      name: '',
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

  handleRegisterSubmit(e){
    e.preventDefault();
    registerUser(this.state)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })

    console.log(document.cookie);
    // userInfo();
  };

  handleLoginSubmit(e){
    e.preventDefault();
    loginUser(this.state)
    .then(res => {
      console.log(res.data);
      res.data.success === true ? document.cookie = `token=${res.data.token}` : alert("couldn't log in");
    })
    .then(cookie => {
      userInfo(document.cookie);
    })
    .catch(err => {
      console.log(err);
    })

  }

  render(){
    return(
      <div>
        <div>{this.renderLogin()}</div>
        <div>{this.renderSignUp()}</div>
      </div>
    )
  }
};

export default signupForm;