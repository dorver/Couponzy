import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listCoupons } from '../actions/couponActions';

const CouponListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const couponList = useSelector((state) => state.couponList);
  const { loading, error, coupons } = couponList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isSeller) {
      dispatch(listCoupons());
    } else {
      history.push('/userLogin');
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      //DELEYTE COUPON
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
                  <td>{coupon.inStock}</td>
                  <td>{coupon.expireDate}</td>
                  <td>{coupon.published}</td>
                  <td>
                    <LinkContainer to={`/seller/coupon/${coupon._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(coupon._id)}
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
