import {
  ADD_USERPAGE_COMMENTS,
  REMOVE_COMMENTS,
} from '../constants';

const initialState = {
  comments: [],
};

const userPageReducer = (state=initialState, action) => {
  switch(action.type){
    case ADD_USERPAGE_COMMENTS:
      console.log(action.payload);
      return {...state,
        comments: action.payload,
      }
    break;
    case REMOVE_COMMENTS:
      const filtered = {
        ...state,
        comments: state.comments.filter(comments => comments._id !== action.payload)
      };
      console.log('remove: ', filtered);
      return filtered;
  default:
    return state;
  }
};

export default userPageReducer;
