import axios from 'axios';
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from '../constants/orderConstants';

export const newOrder = (orderDate, couponId, branch, userId) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ORDER_REQUEST,
    });

    // const config = {
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    // };

    const { data } = await axios.post(
      '/api/orders/create',
      {
        orderDate,
        couponId,
        branch,
        userId,
      } //,
      //config
    );

    dispatch({
      type: ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
      payload:
        error.response && error.response.data.message //future fix
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/orders/ordersByUserId/${id}`);

    dispatch({
      type: GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message //future fix
          ? error.response.data.message
          : error.message,
    });
  }
};
