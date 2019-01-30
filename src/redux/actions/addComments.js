import {
  ADD_COMMENTS,
  ADD_NEW_COMMENT,
  ADD_USERPAGE_COMMENTS,
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

export {
  addComments,
  addNewComment,
  addUserPageComment,
};
