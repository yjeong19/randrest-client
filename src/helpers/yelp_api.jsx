const axios = require('axios');
const url = 'https://randrest-server.herokuapp.com'
// const url = 'http://localhost:8081';

const fetchAPI = (searchType, searchbarInput) => {
  console.log(searchType, searchbarInput);
  return axios.get(`${url}/yelp/${searchType}`, {
    params: {
      term: searchbarInput.term,
      location: searchbarInput.location,
      categories: searchbarInput.categories,
      price: searchbarInput.price,
    }
  })
  // .then((response) => {
  //   // console.log(response.data);
  //   return response.data;
  // })
  // .catch(err => {
  //   console.log(err);
  // })
}

export default fetchAPI;
