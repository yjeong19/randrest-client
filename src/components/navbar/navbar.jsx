import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';


const Cookies = require('js-cookie');



class Navbar extends Component {
  constructor(props){
    super(props);

    this.state = {
      isAuth: false,
      token: '',
    }
  }

  render(){
    return(
      <nav class="navbar navbar-light bg-light nb">
        <a class="navbar-brand">Pick Something</a>
        <Link className='nb_option' to="/protected">UserPage</Link>
        <Link className='nb_option' to="/login">login</Link>
        <Link className='nb_option' to="/">Search</Link>
        {/* <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
      </nav>
    )
  };
};

export default Navbar;
