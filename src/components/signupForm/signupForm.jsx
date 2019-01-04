import React, { Component } from 'react';

class signupForm extends Component {
  constructor(props){
    super(props);
    this.state= {
      email: '',
      password1: '',
      password2: '',
      name: '',
    }
    //bind events
    this.renderSignUp = this.renderSignUp.bind(this);
    this.renderLogIn = this.renderLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  renderLogIn(){
    return(
      <form>
        <div className='form-group'>
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="password1">Password</label>
          <input type="password" class="form-control" id="password1" placeholder="Password" />
        </div>
      </form>
    )
  }

  renderSignUp(){
    return(
      <form>
        <div className='form-group'>
          <label for="exampleInputEmail1">Email address</label>
          <input id="email" onChange={this.handleSignUp} type="email" className="email form-control" placeholder="Enter email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="name">Username</label>
          <input onChange={this.handleSignUp} className="password 2 form-control" id="userame" placeholder="Username" />
        </div>
        <div class="form-group">
          <label for="password1">Password</label>
          <input onChange={this.handleSignUp} type="password" className="password form-control" id="password1" placeholder="Password" />
        </div>
        <div class="form-group">
          <label for="password2">Re Enter Password</label>
          <input onChange={this.handleSignUp} type="password" className="password 2 form-control" id="password2" placeholder="Password" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    )
  }

  handleSignUp(e){
    this.setState({[e.target.id] : e.target.value })
  }

  render(){
    return(
      <div>
        {this.renderSignUp()}
      </div>
    )
  }
};

export default signupForm;
