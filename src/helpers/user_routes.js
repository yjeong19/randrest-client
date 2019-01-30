const axios = require('axios');

//dep server
const url = 'https://randrest-server.herokuapp.com';

// dev server
// const url = 'http://localhost:8081';


export const registerUser = (userInfo) => {
  ('register activated');
  (userInfo);
  // (userInfo);
  return axios.post(`${url}/users/register`, {
    email: userInfo.email,
    username: userInfo.name,
    password: userInfo.password,
    password2: userInfo.password2,
  })
};

export const loginUser = (userInfo) => {
  ('loging')
  (userInfo);
  return axios.post(`${url}/users/login`, {
    email: userInfo.email,
    password: userInfo.password,
  })
};

export const userInfo = (token) => {
  (token);
  return axios.get(`${url}/users/current`,{
    headers: {
      'Authorization': token,
    }
  })
  // .then(response => {
  //   (response)
  // })
  // .catch(error => {(error)})
}
