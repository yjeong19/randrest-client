import {
  IS_AUTH,
} from '../constants';

const addAuth = (auth, token) => {
  return {
    type: IS_AUTH,
    auth,
    token
  }
};

export {
  addAuth,
}
