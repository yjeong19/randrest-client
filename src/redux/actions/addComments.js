import {
  ADD_COMMENTS,
  ADD_NEW_COMMENT,
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

export {
  addComments,
  addNewComment
};
