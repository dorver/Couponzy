import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>התחבר</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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

        <Button type='submit' variant='primary'>
          התחבר
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          משתמש חדש?{' '}
          <Link
            to={
              redirect ? `/registerUser?redirect=${redirect}` : '/registerUser'
            }
          >
            צור/צרי חשבון חדש
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginScreen;
