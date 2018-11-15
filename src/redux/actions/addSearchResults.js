import {
  ADD_SEARCH_RESULTS,
  ADD_RANDOM_RESTAURANT,
  ADD_USER_SELECTION,
} from '../constants';

const addSearchResults = (payload) => {
  return {
    type: ADD_SEARCH_RESULTS,
    payload
  }
};

const addRandomRestaurant = (payload) => {
  return {
    type: ADD_RANDOM_RESTAURANT,
    payload
  }
};

const addUserSelection = (payload) => {
  return {
    type: ADD_USER_SELECTION,
    payload
  }
};


export {
  addSearchResults,
  addRandomRestaurant,
  addUserSelection
};
