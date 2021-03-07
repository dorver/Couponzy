import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  couponListReducer,
  couponDetailReducer,
  couponShopListReducer,
} from './reducers/couponReducers';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdatePrpfileReducer,
} from './reducers/userReducers';

import { newOrderReducer, getOrdersReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  couponList: couponListReducer,
  couponShopList: couponShopListReducer,
  couponDetails: couponDetailReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdatePrpfile: userUpdatePrpfileReducer,
  order: newOrderReducer,
  orderList: getOrdersReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
