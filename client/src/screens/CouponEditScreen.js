import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listCouponDetails, updateCoupon } from '../actions/couponActions';
import { listCouponTypes } from '../actions/couponTypesActions';
import {
  COUPON_UPDATE_RESET,
  COUPON_DETAILS_RESET,
} from '../constants/couponConstants';

const CouponEditScreen = ({ match, history }) => {
  const couponId = match.params.id;

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

  const couponDetails = useSelector((state) => state.couponDetails);
  const { loading, error, coupon } = couponDetails;

  const couponTypesList = useSelector((state) => state.couponTypesList);
  const { loadingCouponTypes, errorCouponTypes, couponTypes } = couponTypesList;

  const couponUpdate = useSelector((state) => state.couponUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = couponUpdate;

  useEffect(() => {
    dispatch(listCouponTypes());

    if (successUpdate) {
      dispatch({ type: COUPON_DETAILS_RESET });
      dispatch({ type: COUPON_UPDATE_RESET });
      history.push('/seller/couponlist');
    } else {
      if (!coupon.name || coupon._id !== couponId) {
        dispatch(listCouponDetails(couponId));
      } else {
        setName(coupon.name);
        setInStock(coupon.inStock);
        setOldPrice(coupon.oldPrice);
        setNewPrice(coupon.newPrice);
        setExpireDate(coupon.expireDate);
        setCouponCode(coupon.couponCode);
        setPictureName(coupon.pictureName);
        setPublished(coupon.published);
        setDecription(coupon.decription);
        setCouponType(coupon.couponType);
      }
    }
  }, [dispatch, history, couponId, coupon, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCoupon({
        _id: couponId,
        name,
        inStock,
        expireDate,
        couponCode,
        newPrice,
        oldPrice,
        decription,
        pictureName,
        couponType,
      })
    );
  };

  return (
    <>
      <Link to='/seller/couponlist' className='btn btn-primary my-3'>
        חזור
      </Link>
      <FormContainer>
        <h1>עריכת קופון</h1>
        {(loadingUpdate || loading) && <Loader />}
        {(errorUpdate || error) && (
          <Message variant='danger'>{errorUpdate}</Message>
        )}
        {couponTypes && coupon && (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>שם קופון</Form.Label>
              <Form.Control
                type='name'
                placeholder='הכנס שם קופון'
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
                placeholder='הכנס מחיר חדש'
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='expireDate'>
              <Form.Label>תאריך תפוגה</Form.Label>
              <Form.Control
                type='date'
                name='expireDate'
                placeholder={expireDate}
                locale={'he-IL  '}
                value={new Date(expireDate).toLocaleDateString('en-CA')}
                onChange={(e) => setExpireDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='couponCode'>
              <Form.Label>קוד קופון</Form.Label>
              <Form.Control
                type='oldPrice'
                placeholder='הכנס קוד קופון'
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
                <option value={true}>כן</option>
                <option value={false}>לא</option>
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

            <Form.Group controlId='decription'>
              <Form.Label>פירוט קופון</Form.Label>
              <Form.Control
                type='decription'
                placeholder='פרטי קופון'
                value={decription}
                onChange={(e) => setDecription(e.target.value)}
              ></Form.Control>
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
              עדכן
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CouponEditScreen;
