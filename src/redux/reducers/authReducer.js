import {
  IS_AUTH,
} from '../constants';

const initialState = {
  isAuth: false,
  token: '',
  user: '',
  user_id: '',
};

const authReducer = (state=initialState, action) => {
  switch(action.type){
    case IS_AUTH:
      return {...state,
        isAuth: action.payload.auth,
        token: action.payload.token,
        user: action.payload.username,
        user_id: action.payload.user_id,
      }
    break;
  default:
    return state;
  }
};

export default authReducer;
