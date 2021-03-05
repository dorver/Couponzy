import {
  COUPON_LIST_REQUEST,
  COUPON_LIST_SUCCESS,
  COUPON_LIST_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  COUPON_DETAILS_FAIL,
  COUPON_DELETE_SUCCESS,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_FAIL,
  COUPON_CREATE_REQUEST,
  COUPON_CREATE_SUCCESS,
  COUPON_CREATE_FAIL,
  COUPON_UPDATE_REQUEST,
  COUPON_UPDATE_SUCCESS,
  COUPON_UPDATE_FAIL,
  COUPON_CREATE_REVIEW_REQUEST,
  COUPON_CREATE_REVIEW_SUCCESS,
  COUPON_CREATE_REVIEW_FAIL,
  COUPON_TOP_REQUEST,
  COUPON_TOP_SUCCESS,
  COUPON_TOP_FAIL,
} from '../constants/couponConstants';
import axios from 'axios';

export const listCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: COUPON_LIST_REQUEST });

    const { data } = await axios.get('/api/coupons');

    dispatch({
      type: COUPON_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_LIST_FAIL,
      payload:
        error.response && error.response.data.message //future fix
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCouponDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/coupons/${id}`);

    dispatch({
      type: COUPON_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message //future fix
          ? error.response.data.message
          : error.message,
    });
  }
};
