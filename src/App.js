import React, { Component } from 'react';
import Searchbar from './container/searchbar';
import ResultsPage from './container/resultsPage';
import SelectionPage from './container/selectionLandingPage';
import Login from './container/signupForm';
import { Route, BrowserRouter, Link, Redirect, withRouter } from 'react-router-dom';
import './style.css';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { connect } from 'react-redux';

//testing
import UserPage from './container/userPage';
const Cookies = require('js-cookie');

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
// Cookies.get('isAuth') === 'true'
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )

class App extends Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){
    console.log(this.props);
  }

  render() {
    return (
      <BrowserRouter className='main_page'>
        <div className="App container main_page" >
            <li><Link to="/protected">Protected Page</Link></li>
            <li><Link to="/login">login</Link></li>
            {/* <AuthButton /> */}
            <Searchbar />
            {/* <Form /> */}
            <PrivateRoute exact path='/protected' component = {UserPage} state={this.props.isAuth}/>
            <Route exact path = '/results' component = {ResultsPage} />
            <Route  path = '/restaurant_landing' component = {SelectionPage} />
            <Route exact path = '/login' component = {Login} />
        </div>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = ((state) => {
  return {
    isAuth: state.authReducer.isAuth,
  }
})

export default connect(
  mapStateToProps
)(App);


// export default App;
