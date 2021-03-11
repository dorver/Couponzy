import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listCouponDetails, createCoupon } from '../actions/couponActions';
import { listCouponTypes } from '../actions/couponTypesActions';

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
  const [couponType, setCouponType] = useState('');

  const dispatch = useDispatch();

  const couponList = useSelector((state) => state.couponList);
  const { loading, error, coupon } = couponList;

  const couponTypesList = useSelector((state) => state.couponTypesList);
  const { loadingCouponTypes, errorCouponTypes, couponTypes } = couponTypesList;

  //const redirect = location.search ? location.search.split('=')[1] : '/';

  const couponTypeSelected = (e) => {
    console.log('kjejgje');
    console.log(e);
    setCouponType(e);
  };

  useEffect(() => {
    dispatch(listCouponTypes());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createCoupon(
        name,
        inStock == 'כן' ? true : false,
        // expireDate.toDate(),
        couponCode,
        oldPrice,
        newPrice,
        decription,
        couponType,
        pictureName,
        published
      )
    );
  };

  return (
    <FormContainer>
      <h1>יצירת קופון</h1>
      {/* {message && <Message variant='danger'>{message}</Message>} */}

      {(error || errorCouponTypes) && (
        <Message variant='danger'>{error}</Message>
      )}

      {(loading || loadingCouponTypes) && <Loader />}
      {couponTypes && (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
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

          <Form.Group as={Col} controlId='couponType'>
            <Form.Label>סוג קופון</Form.Label>
            <Form.Control
              as='select'
              defaultValue='בחר...'
              value={couponType}
              onChange={(e) => setCouponType(e.target.value)}
            >
              {couponTypes.map((couponType) => (
                <option value={couponType._id}>{couponType.name}</option>
              ))}
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

          <LinkContainer to={`/seller/couponlist`}>
            <Button type='submit' variant='primary'>
              צור קופון
            </Button>
          </LinkContainer>
        </Form>
      )}
    </FormContainer>
  );
};

export default CouponCreateScreen;
