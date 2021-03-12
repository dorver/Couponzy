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
  COUPON_DELETE_SUCCESS,
  COUPON_DELETE_REQUEST,
  COUPON_DELETE_FAIL,
  COUPON_SET_TO_EXPIRED_REQUEST,
  COUPON_SET_TO_EXPIRED_SUCCESS,
  COUPON_SET_TO_EXPIRED_FAIL,
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

export const listShopCoupons = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_SHOP_LIST_REQUEST });

    const { data } = await axios.get(`/api/coupons/byShopId/${shopId}`);

    dispatch({
      type: COUPON_SHOP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_SHOP_LIST_FAIL,
      payload:
        error.response && error.response.data.message //future fix
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCoupon = (couponId, shopId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COUPON_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/coupons/delete/${couponId}/${shopId}`, config);
    dispatch({
      type: COUPON_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COUPON_DELETE_FAIL,
      payload:
        error.response && error.response.data.massage
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setCouponToExpired = (couponId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_SET_TO_EXPIRED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(`/api/coupons/setCouponToExpired/${couponId}`, config);

    dispatch({
      type: COUPON_SET_TO_EXPIRED_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COUPON_SET_TO_EXPIRED_FAIL,
      payload:
        error.response && error.response.data.massage
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCoupon = (
  name,
  inStock,
  expireDate,
  couponCode,
  oldPrice,
  newPrice,
  decription,
  couponType,
  pictureName,
  published
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/coupons/createAndAddCouponToShop/${userInfo.shop}`,
      {
        name,
        inStock,
        expireDate,
        couponCode,
        oldPrice,
        newPrice,
        decription,
        couponType,
        pictureName,
        published,
      },
      config
    );

    dispatch({
      type: COUPON_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_CREATE_FAIL,
      payload:
        error.response && error.response.data.massage
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCoupon = (coupon) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUPON_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/coupons/edit/${coupon._id}`,
      coupon,
      config
    );

    dispatch({
      type: COUPON_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUPON_UPDATE_FAIL,
      payload:
        error.response && error.response.data.massage
          ? error.response.data.message
          : error.message,
    });
  }
};
