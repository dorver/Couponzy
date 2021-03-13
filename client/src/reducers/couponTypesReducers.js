import {
  COUPON_TYPE_LIST_REQUEST,
  COUPON_TYPE_LIST_SUCCESS,
  COUPON_TYPE_LIST_FAIL,
} from '../constants/couponTypeConstants';

export const couponTypesListReducer = (state = { couponTypes: [] }, action) => {
  switch (action.type) {
    case COUPON_TYPE_LIST_REQUEST:
      return { loadingCouponTypes: true };
    case COUPON_TYPE_LIST_SUCCESS:
      return { loadingCouponTypes: false, couponTypes: action.payload };
    case COUPON_TYPE_LIST_FAIL:
      return { loadingCouponTypes: false, errorCouponTypes: action.payload };
    default:
      return state;
  }
};
