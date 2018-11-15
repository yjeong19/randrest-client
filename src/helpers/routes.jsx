const axios = require('axios');

//if restaurant dne in database, createone.

//if restaurant exists, return that restaurant.

//create methods for
// -- posting comments,
// -- like/dislike,
// -- percentage of likes,
const url = 'https://randrest-server.herokuapp.com/'

//likes/dislikes
export const postLikes = (id, like) => {
  // console.log('getting likes, or posting',id, like);
  return axios.put(`${url}/restaurant/likes`, {
    id,
    like,
  })
}

//grabs comment by restaurant id;
export const getComments = (params) => {
  // let { id } = param;
  // console.log('grabbing comments', params);
  return axios.get(`${url}/restaurant/comments`, {
    params
  })
};

//create comment
export const createComment = (comment) => {
  // console.log('add comment');
  // console.log(comment);
  return axios.put(`${url}/restaurant/comment`, {
    params: comment,
  })
};


//is this create post method even required anymore? checkPost below creates new field if object doesnt exist.
export const createPost = (data) => {
  // console.log('create post activated'
  // console.log(data);
  return axios.post(`${url}/restaurant`,{
    params: data
  })
};

//put method, does it create new one if it exists?
//this method creates a new restaurant model if it dne, else returns existing i believe.
export const checkPost = (data) => {
  // console.log("checkpost activated")
  return axios.put(`${url}/restaurant/selected`, {
    params: data
  })
};

// export default (createPost, checkPost);
//
