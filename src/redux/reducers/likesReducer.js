import {
  ADD_LIKES
} from '../constants';

const initialState = {}

const likesReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_LIKES:
      // console.log(action.likes, 'likes reducer activated ==========');
      return Object.assign({}, action.likes);
    default:
      return state;
  }


}

export default likesReducer;
