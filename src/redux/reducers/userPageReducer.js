import {
  ADD_USERPAGE_COMMENTS,
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
  default:
    return state;
  }
};

export default userPageReducer;
