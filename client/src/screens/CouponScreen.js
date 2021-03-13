import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listBranchNames } from '../actions/branchActions';
import image from '../img/tshirt.jpg';
import { BRANCH_LIST_RESET } from '../constants/branchConstants';

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

  const [branch, setBranch] = useState('');

  const branchesList = useSelector((state) => state.branchesList);
  const { branchList } = branchesList;

  var IsExpired = false;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const couponDetails = useSelector((state) => state.couponDetails);
  const { loading, error, coupon } = couponDetails;

  useEffect(() => {
    dispatch(listCouponDetails(match.params.id));
    if (!branchList) {
      dispatch(listBranchNames(match.params.id));
    } else {
      setBranch(branchList[0]._id);
    }
  }, [dispatch, match, branchList]);

  const buyHandler = () => {
    if (userInfo) {
      dispatch(newOrder(Date.now, coupon._id, branch, userInfo._id));
      dispatch({ type: BRANCH_LIST_RESET });
    }
  };

  const back = () => {
    dispatch({ type: BRANCH_LIST_RESET });
  };

  const validateDate = (value) => {
    var currentdate = new Date();
    var expire = new Date(value);
    console.log('Current Date' + currentdate);
    console.log('Expire Date' + expire);
    if (expire >= currentdate) {
      return expire.toLocaleDateString('he-IL');
    } else {
      IsExpired = true;
      return 'Expried';
    }
  };
  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        <Button className='btn-block' type='button' onClick={() => back()}>
          חזור
        </Button>
      </Link>

      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {branchList && (
        <Row>
          <Col md={3}>
            <Image src={coupon.pictureName} style={{ width: 221, height: 276.98 }} alt={coupon.name} fluid />
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
                בתוקף עד: {validateDate(coupon.expireDate)}
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
                      <strong>₪{coupon.newPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>סטטוס:</Col>
                    <Col>{coupon.inStock == true ? 'במלאי' : 'לא במלאי'}</Col>
                  </Row>
                </ListGroup.Item>
                <Form.Group as={Col} controlId='branch'>
                  <Form.Label>סניף</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue='בחר...'
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  >
                    {branchList.map((branch) => (
                      <option value={branch._id}>{branch.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Link to={userInfo ? `/useCoupon` : '/userLogin'}>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={coupon.countInStock === 0 || IsExpired}
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
    </>
  );
};

export default CouponScreen;
