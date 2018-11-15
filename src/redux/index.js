// import store from './store';
import rootReducer from './reducers';
import { createStore } from 'redux';

export const store = createStore(rootReducer);

window.store = store;
