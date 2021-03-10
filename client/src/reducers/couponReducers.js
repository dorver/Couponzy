import {
  COUPON_LIST_REQUEST,
  COUPON_LIST_SUCCESS,
  COUPON_LIST_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  COUPON_DETAILS_FAIL,
  COUPON_SHOP_LIST_REQUEST,
  COUPON_SHOP_LIST_SUCCESS,
  COUPON_SHOP_LIST_FAIL,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_SUCCESS,
  COUPON_DELETE_FAIL,
  COUPON_SET_TO_EXPIRED_REQUEST,
  COUPON_SET_TO_EXPIRED_SUCCESS,
  COUPON_SET_TO_EXPIRED_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_CREATE_FAIL,
  COUPON_CREATE_RESET,
} from '../constants/couponConstants';

export const couponListReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case COUPON_LIST_REQUEST:
      return { loading: true };
    case COUPON_LIST_SUCCESS:
      return { loading: false, coupons: action.payload };
    case COUPON_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const couponDetailReducer = (
  state = {
    coupon: {
      /*array*/
    },
  },
  action
) => {
  switch (action.type) {
    case COUPON_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COUPON_DETAILS_SUCCESS:
      return { loading: false, coupon: action.payload };
    case COUPON_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const couponShopListReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case COUPON_SHOP_LIST_REQUEST:
      return { loading: true };
    case COUPON_SHOP_LIST_SUCCESS:
      return { loading: false, coupons: action.payload };
    case COUPON_SHOP_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const couponDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_DELETE_REQUEST:
      return { loading: true };
    case COUPON_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COUPON_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const couponSetToExpiredReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_SET_TO_EXPIRED_REQUEST:
      return { loading: true };
    case COUPON_SET_TO_EXPIRED_SUCCESS:
      return { loading: false, success: true };
    case COUPON_SET_TO_EXPIRED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const couponCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_CREATE_REQUEST:
      return { loading: true };
    case COUPON_CREATE_SUCCESS:
      return { loading: false, success: true, coupon: action.payload };
    case COUPON_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COUPON_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
