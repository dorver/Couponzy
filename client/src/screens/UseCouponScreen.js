import React, { useEffect } from 'react';
import { ListGroup, Row, Alert, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BRANCH_LIST_RESET } from '../constants/branchConstants';

const useCouponScreen = () => {
  const couponDetails = useSelector((state) => state.couponDetails);
  const { coupon } = couponDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: BRANCH_LIST_RESET });
  });

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        חזור
      </Link>
      <Col>
        <h2 style={{ textAlign: 'center' }}>
          {' '}
          קוד קופון: {coupon.couponCode}{' '}
        </h2>

        <h1 style={{ textAlign: 'center' }}> תודה </h1>
      </Col>
    </>
  );
};

export default useCouponScreen;
