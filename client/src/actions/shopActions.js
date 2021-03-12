import {
  SHOP_LIST_REQUEST ,
SHOP_LIST_SUCCESS ,
SHOP_LIST_FAIL ,
SHOP_DETAILS_REQUEST ,
SHOP_DETAILS_SUCCESS ,
SHOP_DETAILS_FAIL 
} from '../constants/shopConstants';
import axios from 'axios';

export const listShops = () => async (dispatch) => {
  try {
    dispatch({ type: SHOP_LIST_REQUEST });

    const { data } = await axios.get('/api/shops');

    dispatch({
      type: SHOP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOP_LIST_FAIL,
      payload:
        error.response && error.response.data.message //future fix
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSHOPDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHOP_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/shops/${id}`);

    dispatch({
      type: SHOP_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHOP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message //future fix
          ? error.response.data.message
          : error.message,
    });
  }
};
