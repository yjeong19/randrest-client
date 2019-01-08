import {
  IS_AUTH,
} from '../constants';

const addAuth = (auth) => {
  return {
    type: IS_AUTH,
    auth
  }
};

export {
  addAuth,
}
