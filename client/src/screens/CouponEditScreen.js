import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listCouponDetails } from '../actions/couponActions';

const CouponEditScreen = ({ match, history }) => {
  const couponId = match.params.id;

  const [name, setName] = useState('');
  const [inStock, setInStock] = useState('');
  const [oldPrice, setOldPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [expiredDate, setExpireDate] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [pictureName, setPictureName] = useState('');
  const [published, setPublished] = useState('');
  const [decription, setDecription] = useState('');

  const dispatch = useDispatch();

  const couponDetails = useSelector((state) => state.couponDetails);
  const { loading, error, coupon } = couponDetails;

  useEffect(() => {
    if (!coupon.name || coupon._id !== couponId) {
      dispatch(listCouponDetails(couponId));
    } else {
      setName(coupon.name);
      setInStock(coupon.inStock);
      setOldPrice(coupon.oldPrice);
      setNewPrice(coupon.newPrice);
      setExpireDate(coupon.expiredDate);
      setCouponCode(coupon.couponCode);
      setPublished(coupon.published);
      setDecription(coupon.decription);
    }
  }, [dispatch, history, couponId, coupon]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(
    //   updateProduct({
    //     _id: productId,
    //     name,
    //     price,
    //     image,
    //     brand,
    //     category,
    //     description,
    //     countInStock,
    //   })
    //)
  };

  return (
    <>
      <Link to='/admin/couponlist' className='btn btn-light my-3'>
        חזור
      </Link>
      <FormContainer>
        <h1>עריכת קופון</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>שם קופון</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
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

            <Form.Group controlId='couponCode'>
              <Form.Label>קוד קופון</Form.Label>
              <Form.Control
                type='oldPrice'
                placeholder='הנכס קוד קופון'
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              ></Form.Control>
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
