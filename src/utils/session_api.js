import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  GET_ERRORS,
  RECEIVE_CURRENT_USER,
} from '../redux/constants';

const $ = window.$;

export const setAuthToken = token => {
  if (token) {
    //applies auth to every request
    axios.defaults.headers.common['Authorization'] = token;
  }else {
    //deletes auth headers
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/users/register', userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      //set token to 1s
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode jwtTokn
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })
  })
}

export const loginUser = userData => dispatch => {
  axios
    .post('/users/login', userData)
    .then(res => {
      //setting local storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })
  })
}

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: RECEIVE_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  //remove from localStorage
  localStorage.removeItem('jwtToken');
  //remove auth from future requests
  setAuthToken(false);
  //set current user to empty obj to get false returns
  dispatch(setCurrentUser({}));
}
