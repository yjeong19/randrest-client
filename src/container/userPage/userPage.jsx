import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { addAuth, addUserPageComment, addUserSelection, removeComments } from '../../redux/actions';
import { getUserComments, getOneRestaurant, deleteComment } from '../../helpers/routes';
import './style.css';
const Cookies = require('js-cookie');

class userPage extends Component {
  constructor(props){
    super(props);

    //bind events
    this.AuthButton = this.AuthButton.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    // this.linkToRest = this.linkToRest.bind(this);
  };

  componentDidMount(){
    this.addComments();
  }

  async addComments(){
    let comments = await getUserComments(this.props.auth.user_id);
    this.props.addUserPageComment(comments);
  };



  handleDeleteButton(e){
    // event.preventDefault();
    const split = e.target.id.split(' ')
    const id = {id: split[1]}
    deleteComment(id)
    .then(res => {
      this.props.removeComments(res.data._id);
    })
    .catch(err => {
      console.log(err);
    })
    .catch(err =>{console.log(err)})
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
          return(
            <div className ={`commentCard row`}>
              <h1 className={`comment_user col-lg-12`} id={comment.restaurant_id} >{comment.restaurant_name}</h1>
              <img className='user_img col-lg-2' id='img_url' alt='user profile pic' src={comment.image_url} width='20px' height = '20px' />
              <div className='comment_info col-lg-6'>
                <p className='user_comment'>{comment.comment}</p>
                {/* temp using current date */}
                <button id={`delete_button ${comment._id}`} onClick={this.handleDeleteButton}>Delete</button>
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
        <h1>{this.props.auth.user ? this.props.auth.user: null}</h1>
        <div>{this.AuthButton()}</div>
        {/* <Link to = {'/restaurant_landing'}> */}
          <div>{this.renderComments()}</div>
        {/* </Link> */}
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  addAuth: (auth) => dispatch(addAuth(auth)),
  addUserPageComment: (payload) => dispatch(addUserPageComment(payload)),
  addUserSelection: (payload) => dispatch(addUserSelection(payload)),
  removeComments: (payload) => dispatch(removeComments(payload)),
});

const mapStateToProps = ((state, ownProps) => {
  // (state);
  return {
    auth: state.authReducer,
    userComments: state.userPageReducer.comments,
    selection: state.searchResultsReducer,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userPage);
