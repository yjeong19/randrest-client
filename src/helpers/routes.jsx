const axios = require('axios');

//if restaurant dne in database, createone.

//if restaurant exists, return that restaurant.

//create methods for
// -- posting comments,
// -- like/dislike,
// -- percentage of likes,
const url = 'https://randrest-server.herokuapp.com'

//dev server
// const url = 'http://localhost:8081';

//get single restaurant info from own db
export const getOneRestaurant = (restaurant_id) => {
  return axios.get(`${url}/restaurant`, {
    params: {
      restaurant_id
    }
  })
  // .then(data =>{ (data) })
  // .catch(err => { (err) });
}

//likes/dislikes
export const postLikes = (id, like) => {
  // ('getting likes, or posting',id, like);
  return axios.put(`${url}/restaurant/likes`, {
    id,
    like,
  })
}

//grabs comment by restaurant id;
export const getComments = (params) => {
  // let { id } = param;
  // ('grabbing comments', params);
  return axios.get(`${url}/rest/comments`, {
    params
  })
};

//create comment
export const createComment = (params) => {
  // ('add comment');
  return axios.post(`${url}/comments`, {
    params
  })
};

//delete comments:
//need to delete from all comments, user and restaurant;
export const deleteComment = (params) => {
  return axios.delete(`${url}/comments`, {
    params
  })
};


//is this create post method even required anymore? checkPost below creates new field if object doesnt exist.
export const createPost = (data) => {
  // ('create post activated'
  return axios.post(`${url}/restaurant`,{
    params: data
  })
};

//put method, does it create new one if it exists?
//this method creates a new restaurant model if it dne, else returns existing i believe.
export const checkPost = (data) => {
  return axios.put(`${url}/restaurant/selected`, {
    params: data
  })
};

export const getUserComments = (params) => {
  return axios.get(`${url}/comments`, {
    params: {
      user_id: params
    }
  })
  .then(res => {
    console.log (res.data);
    return res.data;
  })
  .catch(err => {
    console.log(err);
  })
};
// export default (createPost, checkPost);
//
