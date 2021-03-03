import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Coupon from '../components/Coupon';
import coupons from '../coupons';

const HomeScreen = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>קופונים אחרונים</h1>
      <Row>
        {coupons.map((coupon) => (
          <Col key={coupon._id} sm={12} md={6} lg={4} xl={3}>
            <Coupon coupon={coupon} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
