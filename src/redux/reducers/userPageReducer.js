import {
  ADD_USERPAGE_COMMENTS,
  REMOVE_COMMENT
} from '../constants';

const initialState = {
  comments: [],
};

const userPageReducer = (state=initialState, action) => {
  switch(action.type){
    case ADD_USERPAGE_COMMENTS:
      (action.payload);
      return {...state,
        comments: action.payload,
      }
    break;
    case REMOVE_COMMENT:
      (action.payload);
      const filtered = {
        ...state,
        comments: state.comments.filter(comments => comments._id !== action.payload)
      }
      ('fieltered: ', filtered);
      return filtered;
  default:
    return state;
  }
};

export default userPageReducer;
