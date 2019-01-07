import React, { Component } from 'react';
import Searchbar from './container/searchbar';
import ResultsPage from './container/resultsPage';
import SelectionPage from './container/selectionLandingPage';
import Login from './components/signupForm';
import { Route, BrowserRouter, Link, Redirect, withRouter } from 'react-router-dom';
import './style.css';

//testing
import Form from './components/signupForm';
import UserPage from './container/userPage';
const Cookies = require('js-cookie');

function PrivateRoute({ component: Component, ...rest}){
  return(
    <Route
      {...rest}
      render={props =>
        Cookies.get('isAuth') === 'true' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }} />
          )
        } />
      )
    };

    const AuthButton = withRouter(({ history }) => (
      Cookies.get('isAuth') ? (
        <p>
          Welcome! <button onClick={() => {
            Cookies.set('isAuth', false);
            Cookies.set('token', '');
          }}>Sign out</button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
    ))


class App extends Component {
  render() {
    return (
      <BrowserRouter className='main_page'>
        <div className="App container main_page" >
          <li><Link to="/protected">Protected Page</Link></li>
            <AuthButton />
            <Searchbar />
            {/* <Form /> */}
            <PrivateRoute path='/protected' component = {UserPage} />
            <Route exact path = '/results' component = {ResultsPage} />
            <Route path = '/restaurant_landing' component = {SelectionPage} />
            <Route path = '/login' component = {Login} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
