import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Coupon from '../components/Coupon';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listCoupons } from '../actions/couponActions';

const MyCouponsScreen = () => {
  const dispatch = useDispatch();

  const couponList = useSelector((state) => state.couponList);
  const { loading, error, coupons } = couponList;

  useEffect(() => {
    dispatch(listCoupons());
  }, [dispatch]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>הקופונים שלי</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {coupons.map((coupon) => (
            <Col key={coupon._id} sm={12} md={6} lg={4} xl={3}>
              <Coupon coupon={coupon} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MyCouponsScreen;
