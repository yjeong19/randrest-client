import { combineReducers } from 'redux';
// import initialReducer from './initialReducer';
import searchResultsReducer from './searchResultsReducer';
import commentsReducer from './commentsReducer';
import likesReducer from './likesReducer';
import authReducer from './authReducer';
import userPageReducer from './userPageReducer';

const rootReducer = combineReducers({
  // initialReducer,
  searchResultsReducer,
  commentsReducer,
  likesReducer,
  authReducer,
  userPageReducer,
});

export default rootReducer;
