import { combineReducers } from 'redux';
// import initialReducer from './initialReducer';
import searchResultsReducer from './searchResultsReducer';
import commentsReducer from './commentsReducer';
import likesReducer from './likesReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
  // initialReducer,
  searchResultsReducer,
  commentsReducer,
  likesReducer,
  sessionReducer,
});

export default rootReducer;
