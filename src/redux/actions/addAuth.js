import {
  IS_AUTH,
} from '../constants';

const addAuth = (payload) => {
  return {
    type: IS_AUTH,
    payload
  }
};

export {
  addAuth,
}
