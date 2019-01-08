import React, { Component } from 'react';
import Searchbar from './container/searchbar';
import ResultsPage from './container/resultsPage';
import SelectionPage from './container/selectionLandingPage';
import Login from './container/signupForm';
import { Route, BrowserRouter, Link, Redirect, withRouter } from 'react-router-dom';
import './style.css';
// import PrivateRoute from './privateroute.js';

//testing
import UserPage from './container/userPage';
const Cookies = require('js-cookie');

// function PrivateRoute({ component: Component, ...rest}){
//   return(
//     <Route
//       {...rest}
//       render={props =>
//         Cookies.get('isAuth') === 'true' ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: { from: props.location }
//             }} />
//           )
//         } />
//       )
//     };

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Cookies.get('isAuth') === 'true'
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)


class App extends Component {
  render() {
    return (
      <BrowserRouter className='main_page'>
        <div className="App container main_page" >
          <li><Link to="/protected">Protected Page</Link></li>
            {/* <AuthButton /> */}
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
