import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  couponListReducer,
  couponDetailReducer,
  couponShopListReducer,
  couponDeleteReducer,
  couponSetToExpiredReducer,
  couponCreateReducer,
  couponUpdateReducer,
} from './reducers/couponReducers';

import { branchNamesListReducer } from './reducers/branchReducers';

import { shopListReducer, shopDetailReducer } from './reducers/shopReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

import { newOrderReducer, getOrdersReducer } from './reducers/orderReducers';
import { setCouponToExpired } from './actions/couponActions';
import { couponTypesListReducer } from './reducers/couponTypesReducers';

const reducer = combineReducers({
  couponList: couponListReducer,
  shopList: shopListReducer,
  couponShopList: couponShopListReducer,
  couponDetails: couponDetailReducer,
  couponCreate: couponCreateReducer,
  couponUpdate: couponUpdateReducer,
  couponDelete: couponDeleteReducer,
  setCouponToExpired: couponSetToExpiredReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  order: newOrderReducer,
  orderList: getOrdersReducer,
  couponTypesList: couponTypesListReducer,
  branchesList: branchNamesListReducer,
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
