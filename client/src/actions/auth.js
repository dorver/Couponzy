import axios from 'axios';
import { setAlert } from './alert';
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL, USER_LOADED, AUTH_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';


// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
      const res = await axios.get('/api/auth/auth');
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };


//Register User
export const register = ({ name, email, password, phoneNumber, birthday, gender }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(gender);

    const body = JSON.stringify({ name, email, password, phoneNumber, birthday, gender });
    console.log(gender);
    console.log(body.gender);


    try {
        const res = await axios.post('/api/user/registerUser', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
          type: REGISTER_FAIL
      });
    }

}