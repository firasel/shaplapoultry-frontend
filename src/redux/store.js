import { configureStore } from '@reduxjs/toolkit';
import bricksReducer from './bricks';
import customerReducer from './customer';
import logInReducer from './loggin';
import poultryReducer from './poultry';

export default configureStore({
  reducer: {
    loggedIn: logInReducer,
    bricksData: bricksReducer,
    poultryData: poultryReducer,
    customerData: customerReducer
  },
});