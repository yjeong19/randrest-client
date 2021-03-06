import React, { Component } from 'react';
import './style.css';
import { checkPost } from '../../helpers/routes.jsx'

class choiceCards extends Component {
  constructor(props){
    super(props);

    // bind events
    this.handleUserSelection = this.handleUserSelection.bind(this);
  }

  componentDidMount(){

  }

  //handle user selection then route to landing page
  handleUserSelection(e){
    //right now, click on h1 will link to landing page
    this.props.addUserSelection(this.props.data);
  }


  render(){
    return(
      <div className="card text-center container card_wrapper">
        <div className = 'row card_items' onClick={this.handleUserSelection}>
          <img className = 'col-md-3 col-sm-6 col-xs-12 rest_img' alt='restaurant image' src = {this.props.data.image_url}/>
          <div class="card-body col-md-8 col-sm-6 col-xs-12">
            <h5 class="col-md-8 col-xs-12 card_title">{this.props.data.name}</h5>
            <div className='col-md-8 col-xs-12 card_info' >
              <p class="card_info">{this.props.data.location.address1 ? `Address: ${this.props.data.location.address1} ${this.props.data.location.city}, ${this.props.data.location.state} ${this.props.data.location.zip_code}` : 'No Address'}</p>
              <p class="price">{`Price: ${this.props.data.price}`}</p>
              <p class="rating">{`Yelp rating: ${this.props.data.rating}`}</p>
            </div>
            {/* <a href="#" id = {this.props.data.id} className='card'>Select</a> */}
          </div>
        </div>
          {/* <a href={this.props.data.url}>Yelp Link</a> */}
      </div>
    )
  }
}

export default choiceCards;
