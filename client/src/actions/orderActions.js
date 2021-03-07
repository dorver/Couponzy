import axios from 'axios';
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
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
