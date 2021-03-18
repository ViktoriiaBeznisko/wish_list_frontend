import wishListsReducer from './wishListsReducer';
import userReducer from './userReducer';

import { combineReducers } from 'redux'


// Reducers are there to manage state in an application
// combineReducers allows us to combine multiple reducers, keeping their parts of state separate based on the keys we define
export const reducer = combineReducers({
  wish_lists: wishListsReducer, 
  user: userReducer
})