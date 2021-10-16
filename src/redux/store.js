import { configureStore } from '@reduxjs/toolkit';
import adminEmployeeReducer from './AdminEmployee';
import bricksReducer from './bricks';
import customerReducer from './customer';
import dataChangeReducer from './dataChange';
import logInReducer from './loggin';
import poultryReducer from './poultry';

export default configureStore({
  reducer: {
    loggedIn: logInReducer,
    bricksData: bricksReducer,
    poultryData: poultryReducer,
    customerData: customerReducer,
    adminEmployeeData: adminEmployeeReducer,
    anyDataChange: dataChangeReducer
  },
});