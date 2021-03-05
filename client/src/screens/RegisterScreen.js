import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const [message, setMessage] = useState(null);
  // const [isAdmin, setIsAdmin] = useState('');
  //const [isCustomer, setIsCustomer] = useState('');
  //const [isSeller, setIsSeller] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  //const [birthday, setBirthday] = useState('');
  //const [gender, setGender] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('ססמאות לא תואמות');
    } else {
      dispatch(
        register(
          firstName,
          lastName,
          email,
          password,
          //  isAdmin,
          //  isCustomer,
          //  isSeller,
          phoneNumber
          // birthday,
          //gender
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>הרשמה</h1>
      {message && <Message variant='danger'>{message}</Message>}

      {error && <Message variant='danger'>{error}</Message>}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='firstName'>
          <Form.Label>שם פרטי</Form.Label>
          <Form.Control
            type='firstName'
            placeholder='הכנס/י שם פרטי'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='lastName'>
          <Form.Label>שם משפחה</Form.Label>
          <Form.Control
            type='lastName'
            placeholder='הכנס/י שם משפחה'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>כתובת אימייל</Form.Label>
          <Form.Control
            type='email'
            placeholder='הכנס/י אימייל'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>סיסמה</Form.Label>
          <Form.Control
            type='password'
            placeholder='הכנס/י סיסמה'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmedPassword'>
          <Form.Label>אשר סיסמה</Form.Label>
          <Form.Control
            type='password'
            placeholder='הכנס/י סיסמה שוב'
            value={confirmPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phoneNumber'>
          <Form.Label>מספר טלפון</Form.Label>
          <Form.Control
            type='phoneNumber'
            placeholder='הכנס/י מספר טלפון'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          הרשם/ הרשמי
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          משתמש קיים?{' '}
          <Link
            to={redirect ? `/userLogin?redirect=${redirect}` : '/userLogin'}
          >
            התחבר/י
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterScreen;
