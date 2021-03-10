import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listCouponDetails, createCoupon } from '../actions/couponActions';

const CouponCreateScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [inStock, setInStock] = useState('');
  const [oldPrice, setOldPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [expireDate, setExpireDate] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [pictureName, setPictureName] = useState('');
  const [published, setPublished] = useState('');
  const [decription, setDecription] = useState('');

  const dispatch = useDispatch();

  const couponList = useSelector((state) => state.couponList);
  const { loading, error, coupon } = couponList;

  //const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {});
  // if (coupon) {
  //   history.push(redirect);
  // }
  //   }, [history, coupon, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCoupon(
        name,
        inStock == 'כן' ? true : false,
        expireDate.toDate(),
        couponCode,
        oldPrice,
        newPrice,
        decription,
        pictureName,
        published
      )
    );
  };

  return (
    <FormContainer>
      <h1>יצירת קופון</h1>
      {/* {message && <Message variant='danger'>{message}</Message>} */}

      {error && <Message variant='danger'>{error}</Message>}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>שם קופון</Form.Label>
          <Form.Control
            type='name'
            placeholder='הכנס שם'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='oldPrice'>
          <Form.Label>מחיר קודם</Form.Label>
          <Form.Control
            type='oldPrice'
            placeholder='הנכס מחיר קודם'
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='newPrice'>
          <Form.Label>מחיר חדש</Form.Label>
          <Form.Control
            type='newPrice'
            placeholder='הנכס מחיר חדש'
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='decription'>
          <Form.Label>פירוט פריט</Form.Label>
          <Form.Control
            type='decription'
            placeholder='פרט'
            value={decription}
            onChange={(e) => setDecription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='couponCode'>
          <Form.Label>קוד קופון</Form.Label>
          <Form.Control
            type='oldPrice'
            placeholder='הנכס קוד קופון'
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId='inStock'>
          <Form.Label>במלאי?</Form.Label>
          <Form.Control
            as='select'
            defaultValue='בחר...'
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
          >
            <option>בחר...</option>
            <option>כן</option>
            <option>לא</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='pictureName'>
          <Form.Label>תמונה</Form.Label>
          <Form.Control
            type='text'
            placeholder='הכנס url של תמונה'
            value={pictureName}
            onChange={(e) => setPictureName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          צור קופון
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CouponCreateScreen;
