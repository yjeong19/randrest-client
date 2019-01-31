import {
  ADD_SEARCH_RESULTS,
  ADD_RANDOM_RESTAURANT,
  ADD_USER_SELECTION
} from '../constants';

const initialState = {
  search: null,
  random: null,
  state: null,
  selection: {
    id: null
  },
};

const searchResultsReducer = ((state = initialState, action) => {
  switch(action.type){
    case ADD_SEARCH_RESULTS:
      return {
        search: [...action.payload],
        state: 'search'
      };
      break;

    case ADD_RANDOM_RESTAURANT:
      return {
        ...state,
        random: action.payload,
        state: 'random'
      }
      break;

    case ADD_USER_SELECTION:
      return {
        ...state,
        selection: action.payload,
      }
      break;

    default:
      return state;
  }
});

export default searchResultsReducer;
