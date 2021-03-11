import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Shop from '../components/Shop';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listShopCoupons,
  deleteCoupon,
  setCouponToExpired,
  createCoupon,
  listCoupons,
} from '../actions/couponActions';
import { COUPON_CREATE_RESET } from '../constants/couponConstants';

const CouponListScreen = ({ history, match }) => {
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const { data } = await axios.get('/api/shops');
      setShops(data);
    };
    fetchShops();
  }, []);

  const couponList = useSelector((state) => state.couponShopList);
  const { loading, error, coupons } = couponList;

  const couponDelete = useSelector((state) => state.couponDelete);
  const {
    loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = couponDelete;

  const couponCreate = useSelector((state) => state.couponCreate);
  const {
    loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdCoupon,
  } = couponCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: COUPON_CREATE_RESET });

    // if (!userInfo.isSeller) {
    //   history.push('/userLogin');
    // }
    // if (successCreate) {
    //   history.push(`/admin/product/${createdCoupon._id}`);
    // } else {
    //   dispatch(listShopCoupons(userInfo.shop));
    // }

    if (userInfo && userInfo.isSeller) {
      dispatch(listShopCoupons(userInfo.shop));
    } else {
      history.push('/userLogin');
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    //successCreate,
    //createdCoupon,
  ]);

  const deleteHandler = (coupon, couponId, shopId) => {
    if (window.confirm('Are you sure')) {
      if (coupon.orders) {
        dispatch(setCouponToExpired(couponId));
        setMessage('לא ניתן למחוק קופון זה, קיימות לקופון זה הזמנות');
      } else {
        dispatch(deleteCoupon(couponId, shopId));
      }
    }
  };

  return (
    <>
      <Col as='h1'>
        {shops
          .filter((shop) => {
            return shop._id == userInfo.shop;
          })
          .map((shop) => (
            <Col>
              <Shop shop={shop}></Shop>
            </Col>
          ))}
      </Col>

      <Link
        className='btn btn-primary my-3'
        type='submit'
        variant='dark'
        to='/seller/couponCreate'
      >
        הוספת קופון
      </Link>

      <Row className='align-items-center'>
        <Col>
          <h1>קופונים</h1>
          {message && <Message variant='danger'>{message}</Message>}
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                    <LinkContainer to={`/seller/coupon/edit/${coupon._id}`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() =>
                        deleteHandler(coupon, coupon._id, coupon.shop)
                      }
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
