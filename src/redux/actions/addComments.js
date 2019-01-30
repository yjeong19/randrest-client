import {
  ADD_COMMENTS,
  ADD_NEW_COMMENT,
  ADD_USERPAGE_COMMENTS,
  REMOVE_COMMENT,
} from '../constants';


const addComments = (comments) => {
  return {
    type: ADD_COMMENTS,
    comments,
  }
};

const addNewComment = (comment) => {
  return {
    type: ADD_NEW_COMMENT,
    comment
  }
};

const addUserPageComment = (payload) => {
  return {
    type: ADD_USERPAGE_COMMENTS,
    payload,
  }
}

const removeComment = (payload) => {
  return {
    type: REMOVE_COMMENT,
    payload
  }
}

export {
  addComments,
  addNewComment,
  addUserPageComment,
  removeComment,
};
