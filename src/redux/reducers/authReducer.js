import {
  IS_AUTH,
} from '../constants';

const initialState = {
  isAuth: false,
};

const authReducer = (state=initialState, action) => {
  switch(action.type){
    case IS_AUTH:
      console.log(action)
      return {...state, isAuth: action.auth, token: action.token}
    break;
  default:
    return state;
  }
};

export default authReducer;
