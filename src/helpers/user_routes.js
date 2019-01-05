const axios = require('axios');

//dep server
// const url = 'https://randrest-server.herokuapp.com';

// dev server
const url = 'http://localhost:8081';


export const registerUser = (userInfo) => {
  console.log('register activated');
  // console.log(userInfo);
  return axios.post(`${url}/users/register`, {
    email: userInfo.email,
    name: userInfo.name,
    password: userInfo.password,
    password2: userInfo.password2,
  })
};

export const loginUser = (userInfo) => {
  return axios.post(`${url}/users/login`, {
    email: userInfo.email,
    password: userInfo.password,
  })
};

export const userInfo = (info) => {
  console.log(typeof(info));
  const token = info.slice(6);
  return axios.get(`${url}/users/current`,{
    headers: {
      'Authorization': token,
    }
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {console.log(error)})
}