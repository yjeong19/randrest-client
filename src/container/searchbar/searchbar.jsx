import React, { Component } from 'react';
import fetchAPI from '../../helpers/yelp_api';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import './style.css';

class searchbar extends Component {
  constructor(props){
    super(props);

    //var to store searchbar info
    this.searchbarInput = {
      //make term section? or switch with categories
      term: '',
      location: '',
      categories: 'restaurants',
      price: 1,
    };

    //fix toggle active later
    this.toggleActive = {
      active: "btn btn-secondary active",
      not_active: "btn btn-secondary"
    }

    //bind events
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceChoice = this.handlePriceChoice.bind(this);
    this.togglePrice = this.togglePrice.bind(this);
  }

  componentDidMount(){
    // (this.props);
  }

  componentDidUpdate(){

  }

  togglePrice(e){
    // (this.id)
    e.target.id === this.searchbarInput.price ? e.target.className = "btn btn-secondary active" : e.target.className = "btn btn-secondary";
  }

  //this makes keystroke in search bar to searchbarInput object
  handleSearchInput(e){
    switch(e.target.id){
      case 'categories':
        //this may be changed to an array of options later.
        this.searchbarInput.term = e.target.value;
        break;
      case 'location':
        this.searchbarInput.location = e.target.value;
        break;
      default:
        return;
    }
    // this.searchbarInput = e.target.value;
    // (this.searchbarInput);
  }

  handlePriceChoice(e){
    this.searchbarInput.price = e.target.id;
    this.togglePrice(e);
    // this.searchbarInput.price === e.target.id ? e.target.className = "btn btn-secondary active" : e.target.className = "btn btn-secondary";
    // (this.searchbarInput);

  }

  //makes api call to yelpAPI in /controller/yelp_api.jsx
  //api returns either random option or a list of options
  async handleSubmit(e){
    //searchType selects weather it is search or random
    const searchType = e.target.id === 'submit' ? 'search' : 'random';
    ('line 77 searchbar: ', searchType, this.searchbarInput);
    await fetchAPI(searchType, this.searchbarInput)
    .then((response) => {
      ('line 80: ', response);
      searchType === 'search' ? this.props.addSearchResults(response.data) : searchType === 'random' ? this.props.addRandomRestaurant(response.data) : ('err');
      // this.props.addSearchResults(response.data);
    })
    .catch(err => {
      (err);
    })
  };

  renderPriceChoice(){
    const stars = ['$', '$$', '$$$', '$$$$'];

    return (
      <div class="btn-group btn-group-toggle price_choice" data-toggle="buttons">
        {stars.map((num, i) => {
          return(
            <label className="btn btn-secondary" onClick={this.handlePriceChoice}>
              <input type="radio" name="options" id={i+1} />{num}
            </label>
          )
        })}
      </div>
    )
  }

  render(){
    return(
      <div className='jumbotron search_main verticle-center'>
        <h1 className='pick_something'>Pick Something</h1>
        <nav className="navbar search_container" >
          <form class="search_form form-inline">
            <input class="form-control mr-sm-2" placeholder = 'type of food or restaurant' id = 'categories' onChange = {this.handleSearchInput}/>
            <input class="form-control mr-sm-2" placeholder = 'location' id = 'location' onChange = {this.handleSearchInput}/>
            <div>{this.renderPriceChoice()}</div>

          <Link to = {'/results'}>
            <button class="btn search_button my-2 my-sm-0" id = 'submit' onClick = {this.handleSubmit}>Search</button>
            <button class="btn search_button my-2 my-sm-0" id ='random' onClick = {this.handleSubmit}>Randomize</button>
          </Link>
          {/* <div>{this.renderPriceChoice()}</div> */}
          </form>
        </nav>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addSearchResults: (results) => dispatch(actions.addSearchResults(results)),
  addRandomRestaurant: (results) => dispatch(actions.addRandomRestaurant(results)),
});

const mapStateToProps = ((state, ownProps) => {
  // (state);
  return {
    state,
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(searchbar);
