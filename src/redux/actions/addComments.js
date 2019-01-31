import {
  ADD_COMMENTS,
  ADD_NEW_COMMENT,
  ADD_USERPAGE_COMMENTS,
  REMOVE_COMMENTS,
} from '../constants';

const removeComments = (payload) => {
  return {
    type: REMOVE_COMMENTS,
    payload,
  }
};

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

export {
  removeComments,
  addComments,
  addNewComment,
  addUserPageComment,
};
