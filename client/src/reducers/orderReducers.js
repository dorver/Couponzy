import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
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
