import {
  COUPON_TYPE_LIST_REQUEST,
  COUPON_TYPE_LIST_SUCCESS,
  COUPON_TYPE_LIST_FAIL,
} from '../constants/couponTypeConstants';

import axios from 'axios';

export const listCouponTypes = () => async (dispatch) => {
  try {
    dispatch({ type: COUPON_TYPE_LIST_REQUEST });

    const { data } = await axios.get('/api/couponsTypes');

    dispatch({
      type: COUPON_TYPE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_TYPE_LIST_FAIL,
      payload:
        error.response && error.response.data.message //future fix
          ? error.response.data.message
          : error.message,
    });
  }
};
