import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Order from '../components/Order';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const MyCouponsScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    dispatch(listOrders(userInfo._id));
  }, [dispatch]);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>הקופונים שלי</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {orders && (
        <Row>
          {orders.map((order) => (
            <Col key={order._id} sm={12} md={6} lg={4} xl={3}>
              <Order order={order} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default MyCouponsScreen;
