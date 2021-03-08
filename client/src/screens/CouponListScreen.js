import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listShopCoupons, deleteCoupon } from '../actions/couponActions';

const CouponListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const couponList = useSelector((state) => state.couponShopList);
  const { loading, error, coupons } = couponList;

  const couponDelete = useSelector((state) => state.couponDelete);
  const {
    loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = couponDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isSeller) {
      dispatch(listShopCoupons(userInfo.shop));
    } else {
      history.push('/userLogin');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (couponId, shopId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCoupon(couponId, shopId));
    }
  };

  const createCouponHandler = (coupon) => {
    //CREATE COUPON
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>קופונים</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCouponHandler}>
            <i className='fas fa-plus'></i> צור קופון חדש
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>שם</th>
                <th>מחיר קודם</th>
                <th>מחיר חדש</th>
                <th>במלאי</th>
                <th>תוקף</th>
                <th>פירוט</th>
                <th>תאריך פרסום</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>{coupon._id}</td>
                  <td>{coupon.name}</td>
                  <td>${coupon.oldPrice}</td>
                  <td>${coupon.newPrice}</td>
                  <td>
                    {' '}
                    {coupon.inStock ? (
                      <Card.Text as='div'>
                        <div className='my-3'>במלאי</div>
                      </Card.Text>
                    ) : (
                      <Card.Text as='div'>
                        <div className='my-3'>לא במלאי</div>
                      </Card.Text>
                    )}
                  </td>
                  <td>
                    {new Date(coupon.expireDate).toLocaleDateString('he-IL')}
                  </td>
                  <td>{coupon.decription}</td>
                  <td>
                    {new Date(coupon.published).toLocaleDateString('he-IL')}
                  </td>
                  <td>
                    <LinkContainer to={`/seller/coupon/${coupon._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(coupon._id, coupon.shop)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default CouponListScreen;
