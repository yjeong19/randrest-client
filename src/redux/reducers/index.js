import { combineReducers } from 'redux';
// import initialReducer from './initialReducer';
import searchResultsReducer from './searchResultsReducer';
import commentsReducer from './commentsReducer';
import likesReducer from './likesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  // initialReducer,
  searchResultsReducer,
  commentsReducer,
  likesReducer,
  authReducer
});

export default rootReducer;
