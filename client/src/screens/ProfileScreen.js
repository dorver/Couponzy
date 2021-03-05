import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
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

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/userLogin');
    } else {
      if (!user) {
        dispatch(getUserDetails('getUserProfile'));
      } else {
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setEmail(userInfo.email);
        setPhoneNumber(userInfo.phoneNumber);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('ססמאות לא תואמות');
    } else {
      //DISPATCH UPDATE PROFILE
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>חשבון משתמש</h2>
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

          <Button type='submit' variant='primary'>
            עדכן/עדכני
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>הקופונים שלי</h2>
      </Col>
    </Row>
  );
};
export default ProfileScreen;
