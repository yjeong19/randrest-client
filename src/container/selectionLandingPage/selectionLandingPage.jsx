import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import {
  checkPost,
  createComment,
  getComments,
  postLikes,
} from '../../helpers/routes';
import './style.css'
import L from 'leaflet';
import { Redirect } from 'react-router-dom';


//route from resultspage
class selectionLandingPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      restaurant_name: null,
      restaurant_id: null,
      image_url: null,
      comment: null,
      user: null,
      user_id: null,
    };

    this.location = {};

    //bind events
    this.updateLikes = this.updateLikes.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderLeafletMap = this.renderLeafletMap.bind(this);
  }



  componentDidMount(){
    this.renderLeafletMap();
    this.renderSelectedInfo();
    this.getCommentsAndLikes();
    this.setState({
      user: this.props.auth.user,
      user_id: this.props.auth.user_id,
      restaurant_id: this.props.state.selection.id,
      image_url: this.props.state.selection.image_url,
      restaurant_name: this.props.state.selection.name,
    })
  }

  updateLikes(e){
    postLikes(this.props.state.selection.id, e.target.id)
    .then(res => {
      this.props.addLikes(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  getCommentsAndLikes(){
    //also gets likes ---
    //gets comments from db and then puts it into commentsReducer
    // (this.props.state.selection);
    let info = this.props.state.selection ? this.props.state.selection : '';
    if(info !== '') {
      getComments(info)
      .then(res => {
        res.data[0] !== undefined ? this.props.addComments(res.data[0].comments) : this.props.addComments([])
        // (typeof(res.data[0].likes));
        res.data[0] !== undefined ? this.props.addLikes(res.data[0].likes) : this.props.addLikes({});
      })
      .catch(err => {
        console.log(err);
      })
    }else {
      return null;
    }
  };

  handleCommentInput(e){
    this.setState({
      comment: e.target.value,
    })
  };

  handleSubmit(event){
    event.preventDefault();
    if(this.props.isAuth == 'true'){
    createComment(this.state)
    .then(res => {
      this.props.addNewComment(res.data);
    })
    .catch(err => {
      console.log(err);
    })}else{
        // return <Redirect to='/login' />
        alert('please log in');
    }
  };

  renderComments(){
    return(
      <div>
        {this.props.comments.map((comment, i)=>{
          return(
            <div className = 'commentCard row'>
              <h1 className='comment_user col-lg-12'>{comment.username}</h1>
              <img className='user_img col-lg-2' alt='user profile pic' src='#' width='20px' height = '20px' />
              <div className='comment_info col-lg-6'>
                <p className='user_comment'>{comment.comment}</p>
                {/* temp using current date */}
                <p className='comment_date'>{Date.now().toString()}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  };


  //function below creates newly selected restaurants, if it had not been created in DB alraedy.
  //function is run at componentdidmount to check existance.
  renderSelectedInfo(){
    let info = this.props.state.selection ? this.props.state.selection : '';
    if(info !== '') {
      checkPost(info)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }else{
      return null;
    };
  };

  renderCommentForm(){
    return(
        <div className='comment_form'>
          {/* temporarily name, add auth later */}
          <textarea className = 'form-control comment' id='comment' placeholder = 'comment' onChange = {this.handleCommentInput}/>
          <button onClick = {this.handleSubmit}>submit</button>
        </div>
    );
  };

  async renderLeafletMap(){
    let coord = { latitude: 0, longitude: 0}
    const map_data = await this.props.state.selection;
    // coord = await this.props.state.selection !== null ? this.props.state.selection.coordinates : null;
    if(map_data.coordinates){
      coord = map_data.coordinates;
    }
    let { latitude, longitude } = coord;
    // let long = coor.longitude !== null ? coor.longitude: 0;
    if(latitude){
    let map = L.map('mapid', {
    center: [latitude === undefined ? 0 : latitude, longitude === undefined ? 0 : longitude],
    zoom: 20
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //L.marker puts mark on location
    L.marker([latitude === undefined ? 0 : latitude, longitude === undefined ? 0 : longitude]).addTo(map);
  } else {
    latitude = null;
    longitude = null;
    return
  }
}


  renderInfoSection(){
    let info = this.props.state.selection ? this.props.state.selection : '';
    return(
      <div className='info_section_wrapper row'>
        <h1 className='restaurant_name col-lg-12'>{info !== '' ? info.name : ''}</h1>
        <img src = {info !== '' ? info.image_url : ''} alt='restaurant image' className='rest_img col-md-4 col-xs-6' width = '200px' height = '200px'/>
        <div className='landing_info_section col-md-4 col-sm-6'>
          {/* POSSIBLY ADD MAPS FOR REST OF ROW */}
          <p className='rest_address'>{info.location !== undefined ?
            `${info.location.address1} \n ${info.location.city}, ${info.location.state} ${info.location.zip_code}` : ''}</p>
          <p className='yelp_price'>{`Yelp Price: ${info.price === undefined ? 'No Rating' : info.price}`}</p>
          <p>{`Yelp Rating: ${info.rating === undefined ? 'No Rating' : info.rating}`}</p>
          <p className = 'likes'>{`Liked: ${this.props.likes.likes === undefined ? 'No Rating': this.props.likes.likes}`}</p>
          <p className = 'dislikes'>{`Disliked: ${this.props.likes.dislikes === undefined ? 'No Rating': this.props.likes.dislikes}`}</p>
          <p className = 'percentage'>{`Percent Liked ${this.props.likes.likes !== undefined && this.props.likes.dislikes/this.props.likes.likes > 0 ? `${(1 - (this.props.likes.dislikes/this.props.likes.likes)).toString().slice(2, 4)}%` : '0'}`}</p>
          <div className='like_container'>
            <button className = 'btn like_button' id='likes' onClick = {this.updateLikes}>Like</button>
            <button className = 'btn dislike_button' id='dislikes' onClick = {this.updateLikes}>Dislike</button>
          </div>
        </div>
      </div>
    );
  };

  render(){
    // let info = this.props.state.selection ? this.props.state.selection : '';
    return(
      <div className='container'>
      <div className='info_container row'>
        <div className ='col-md-6'>{this.renderInfoSection()}</div>
        <div className='col-md-6 map_container'>
          <div id='mapid'>MAP CONTAINER</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'></div>
        <div className='col-md-6'>
          {this.renderCommentForm()}
          {this.renderComments()}
        </div>
        {/* {this.renderLeafletMap()} */}
      </div>
    </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  addUserSelection: (selection) => dispatch(actions.addUserSelection(selection)),
  addComments: (comments) => dispatch(actions.addComments(comments)),
  addNewComment: (comment) => dispatch(actions.addNewComment(comment)),
  addLikes: (likes) => dispatch(actions.addLikes(likes)),
});

const mapStateToProps = ((state, ownProps) => {
  return {
    state: state.searchResultsReducer,
    comments: state.commentsReducer,
    likes: state.likesReducer,
    isAuth: state.authReducer.isAuth,
    auth: state.authReducer,
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(selectionLandingPage);
