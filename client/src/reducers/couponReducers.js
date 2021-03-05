import {
  COUPON_LIST_REQUEST,
  COUPON_LIST_SUCCESS,
  COUPON_LIST_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  COUPON_DETAILS_FAIL,
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
