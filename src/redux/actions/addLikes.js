import {
  ADD_LIKES
} from '../constants';

const addLikes = (likes) => {
  return {
    type: ADD_LIKES,
    likes
  }
};

export { addLikes };
