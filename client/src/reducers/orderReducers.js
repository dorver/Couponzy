import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
} from '../constants/orderConstants';

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { loading: true };
    case ORDER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return { loading: true };
    case GET_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
