import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import image from '../img/tshirt.jpg';
//import ListGroup from 'react-bootstrap/ListGroup';
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listCouponDetails } from '../actions/couponActions';
import { newOrder } from '../actions/orderActions';

const CouponScreen = ({ match }) => {
  //const coupon = coupons.find((p) => p._id === match.params.id);
  const dispatch = useDispatch();

  const couponDetails = useSelector((state) => state.couponDetails);
  const { loading, error, coupon } = couponDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listCouponDetails(match.params.id));
  }, [dispatch, match]);

  const buyHandler = () => {
    dispatch(newOrder(Date.now, coupon._id, '', userInfo._id));
  };

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        חזור
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={3}>
            <Image src={coupon.pictureName} alt={coupon.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{coupon.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                מחיר קודם: ₪<del>{coupon.oldPrice}</del>
              </ListGroup.Item>
              <ListGroup.Item>מחיר חדש: ₪{coupon.newPrice}</ListGroup.Item>
              <ListGroup.Item>
                בתוקף עד:{' '}
                {new Date(coupon.expireDate).toLocaleDateString('he-IL')}
              </ListGroup.Item>
              <ListGroup.Item>פירוט: {coupon.decription}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>מחיר:</Col>
                    <Col>
                      <strong>${coupon.newPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>סטטוס:</Col>
                    <Col>{coupon.inStock == true ? 'במלאי' : 'לא במלאי'}</Col>
                  </Row>
                </ListGroup.Item>
                {/* 
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )} */}
                <Link to='/useCoupon'>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={coupon.countInStock === 0}
                    onClick={() => buyHandler()}
                  >
                    למימוש
                  </Button>
                </Link>
                ;
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

      {/* <ListGroup.Item>Price: ${coupon.price}</ListGroup.Item>
            <ListGroup.Item>Description: {coupon.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${coupon.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row> */}
    </>
  );
};

export default CouponScreen;
