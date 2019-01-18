import React, { Component } from 'react';
import Searchbar from './container/searchbar';
import ResultsPage from './container/resultsPage';
import SelectionPage from './container/selectionLandingPage';
import Login from './container/signupForm';
import { Route, BrowserRouter, Link, Redirect, withRouter } from 'react-router-dom';
import './style.css';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { connect } from 'react-redux';
import Navbar from './components/navbar';
import { addAuth } from './redux/actions';
import { userInfo } from './helpers/user_routes';

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

    this.state = {
      isAuth: '',
      token: '',
      auth: '',
    }

  }
  async componentDidMount(){
    await this.setState({
      isAuth: Cookies.get('isAuth'),
      token: Cookies.get('token'),
    });
    console.log(this.state);
    userInfo(this.state.token)
    .then(data => {
      console.log(data);
      this.setState({
        user_id: data.data.id,
        username: data.data.username,
        auth: Cookies.get('isAuth'),
      })
      console.log(this.state);
      this.props.addAuth(this.state)
    })

  }

  render() {
    return (
      <BrowserRouter className='main_page'>
        <div className="App container main_page" >
            {/* <AuthButton /> */}
            <Navbar state={this.props.isAuth}/>
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
    token: state.authReducer.token,
  }
});

const mapDispatchToProps = (dispatch) => ({
  addAuth: (auth) => dispatch(addAuth(auth)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);


// export default App;
