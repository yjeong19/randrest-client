import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { addAuth, addUserPageComment } from '../../redux/actions';
import { getUserComments } from '../../helpers/routes';
const Cookies = require('js-cookie');

class userPage extends Component {
  constructor(props){
    super(props);

    //bind events
    this.AuthButton = this.AuthButton.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.renderComments = this.renderComments.bind(this);
  };

  componentDidUpdate(){
    console.log(this.props);
  }

  componentDidMount(){
    this.addComments();
  }

  async addComments(){
    let comments = await getUserComments(this.props.auth.user_id);
    this.props.addUserPageComment(comments);
  }

  AuthButton(){
    return(
      <div>{
        this.props.auth.isAuth == 'true' ? (
          <p>
            Welcome! <button onClick={this.logoutUser}>Sign out</button>
          </p>
        ) : (
          <p>You are not logged in.</p>
        )
      }</div>
    )
  };

  renderComments(){
    return(
      <div>{this.props.auth.isAuth == 'true' && this.props.userComments ? (
        <div>
        {this.props.userComments.map((comment, i)=>{
          console.log('line 119: ', comment)
          return(
            <div className = 'commentCard row'>
              <h1 className='comment_user col-lg-12'>{comment.restaurant_name}</h1>
              <div className='comment_info col-lg-6'>
                <p className='user_comment'>{comment.comment}</p>
                {/* temp using current date */}
                <p className='comment_date'>{Date.now().toString()}</p>
              </div>
            </div>
          )}
          )
        }</div>) :
        null
      }
      </div>
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
    if(this.props.auth.isAuth == 'false') {
      return <Redirect to='/login' />
    }
    return(
      <div>
        <h1>Protected</h1>
        <div>{this.AuthButton()}</div>
        <div>{this.renderComments()}</div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  addAuth: (auth) => dispatch(addAuth(auth)),
  addUserPageComment: (payload) => dispatch(addUserPageComment(payload)),
});

const mapStateToProps = ((state, ownProps) => {
  // console.log(state);
  return {
    auth: state.authReducer,
    userComments: state.userPageReducer.comments,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userPage);
