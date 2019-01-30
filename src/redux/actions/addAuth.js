import {
  IS_AUTH,
} from '../constants';

const addAuth = (payload) => {
  ('add Auth', payload);
  return {
    type: IS_AUTH,
    payload
  }
};

export {
  addAuth,
}
