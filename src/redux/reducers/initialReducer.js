import {
  ADD_INFO,
} from '../constants';

const initialState = null;

const initialReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_INFO:
      return state;

    default:
      return state;
  }
}

export default initialReducer;
