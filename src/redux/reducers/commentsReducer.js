import {
  ADD_COMMENTS,
  ADD_NEW_COMMENT,
  REMOVE_COMMENT,
} from '../constants';

let initialReducer = [];

const commentsReducer = ((state = initialReducer, action) => {
  switch(action.type){
    case ADD_COMMENTS:
      // let empty = state.slice(state.length)
      return state.slice(state.length).concat(action.comments);
    case ADD_NEW_COMMENT:
      return [...state, action.comment];
    default:
      return state;
  }
});

export default commentsReducer;
