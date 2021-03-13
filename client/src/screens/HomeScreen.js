import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Dropdown, Option } from 'react-bootstrap';
import Coupon from '../components/Coupon';
import ShopCoupons from '../components/ShopCoupons';
import Shop from '../components/Shop';
import CouponType from '../components/CouponType';
import Message from '../components/Message';
import Loader from '../components/Loader';
//import coupons from '../coupons';
import { listCoupons } from '../actions/couponActions';
import { listShops } from '../actions/shopActions';
import { render } from 'react-dom';
import { listCouponDetails } from '../actions/couponActions';
import { BRANCH_LIST_RESET } from '../constants/branchConstants';
import { USER_UPDATE_RESET } from '../constants/userConstants';

import axios from 'axios';
const HomeScreen = () => {
  const [shops, setShops] = useState([]);
  const [couponTypes, setCouponTypes] = useState([]);
  const [groupBy, setGroupBy] = useState(false);
  const [searchcouponTypes, setSearchcouponTypes] = useState('');
  const [range, setRange] = useState('');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const couponList = useSelector((state) => state.couponList);
  const { loading, error, coupons } = couponList;

  useEffect(() => {
    const fetchShops = async () => {
      const { data } = await axios.get('/api/shops');
      setShops(data);
    };
    fetchShops();
  }, []);
  useEffect(() => {
    const fetchCouponTypes = async () => {
      const { data } = await axios.get('/api/couponsTypes');
      setCouponTypes(data);
    };
    fetchCouponTypes();
  }, []);

  useEffect(() => {
    dispatch({ type: BRANCH_LIST_RESET });
    dispatch({ type: USER_UPDATE_RESET });
    dispatch(listCoupons());
  }, [dispatch]);

  // const flit=this.coupons.filter((coupon)=>{

  //   return coupon.name.indexOf(search)!==-1
  // });
  const updateSearch = (event) => setSearch(event.target.value);
  const updateGroupBy = () => setGroupBy(!groupBy);
  const updateRange = (event) => setRange(event.target.value);
  const getShopname = (shopName) => {
    return shops.filter((shop) => {
      return shopName == shop._id;
    });
  };
  const getCouponTypeName = (CouponTypeid) => {
    return couponTypes.filter((CouponType) => {
      return CouponTypeid == CouponType._id;
    });
  };
  return (
    <>
      <div>
        <Row>
          <Col>
            <p>חיפוש לפי שם מוצר, חנות ...</p>
            <input
              type='text'
              className='mr-sm-2 ml-sm-5'
              value={search}
              onChange={updateSearch.bind(this)}
            ></input>
          </Col>
          <Col>
            <p>בחר/י סוג קןפון </p>
            <select
              value={searchcouponTypes}
              onChange={(e) => setSearchcouponTypes(e.target.value)}
            >
              <option value='בחר/י סוג קופון'>בחר/י סוג קופון</option>

              {couponTypes.map((couponType) => (
                <option key={couponType._id}>{couponType.name} </option>
              ))}
            </select>
          </Col>
          <Col>
            <div class='btn-group' role='group' aria-label='Basic example'>
              <button
                type='button'
                class='btn btn-secondary'
                onClick={updateGroupBy}
              >
                רגיל /סדר לפי חנות
              </button>
            </div>
          </Col>
          <Col>
            <p> חיפוש לפי מחיר מ-0₪ עד </p>
            <input
              type='text'
              className='mr-sm-2 ml-sm-5'
              value={range}
              onChange={updateRange.bind(this)}
            ></input>
          </Col>
          <Col>
            <p className='event_desc'>{range}</p>
            <input
              type='range'
              min='0'
              max='1000'
              className='slider'
              defaultValue='0'
              id='myRange'
              onChange={updateRange.bind(this)}
            ></input>
          </Col>
        </Row>
      </div>
      {/*returns the shop*/}
      <div>
        {groupBy ? (
          <Col>
            {shops.map((shop) => (
              <Col>
                <Shop shop={shop}></Shop>
                {console.log(shop)}
                <ShopCoupons shopCoupon={shop}></ShopCoupons>
              </Col>
            ))}
          </Col>
        ) : (
          <div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Row>
                {coupons
                  .filter((coupon) => {
                    var shpname = getShopname(coupon.shop)[0];
                    var typname = getCouponTypeName(coupon.couponType)[0];
                    //console.log(getCouponTypeName(coupon.couponType)[0].name.toLowerCase().toString());
                    var x = coupon.newPrice.toString().indexOf(search) !== -1;
                    var y = coupon.name.toString().indexOf(search) !== -1;
                    console.log(searchcouponTypes + 'xx');
                    if( shpname==null)
                    return ;
                    if (
                      searchcouponTypes == '' ||
                      searchcouponTypes == 'בחר/י סוג קופון'
                    ) {
                      if (range == '' || range == 0) {
                        if (y) return y;
                        if (
                          shpname.shopName
                            .toLowerCase()
                            .toString()
                            .indexOf(search.toLowerCase()) !== -1
                        )
                          return (
                            shpname.shopName
                              .toLowerCase()
                              .toString()
                              .indexOf(search.toLowerCase()) !== -1
                          );
                        console.log(
                          typname.name
                            .toLowerCase()
                            .toString()
                            .indexOf(searchcouponTypes.toLowerCase())
                        );
                      } else {
                        if (y && coupon.newPrice <= range) return y;
                        if (
                          shpname.shopName
                            .toLowerCase()
                            .toString()
                            .indexOf(search.toLowerCase()) !== -1 &&
                          coupon.newPrice <= range
                        )
                          return (
                            shpname.shopName
                              .toLowerCase()
                              .toString()
                              .indexOf(search.toLowerCase()) !== -1
                          );
                      }
                    } else {
                      if (range == '' || range == 0) {
                        if (
                          y &&
                          typname.name
                            .toLowerCase()
                            .toString()
                            .indexOf(searchcouponTypes.toLowerCase()) !== -1
                        )
                          return y;
                        if (
                          shpname.shopName
                            .toLowerCase()
                            .toString()
                            .indexOf(search.toLowerCase()) !== -1 &&
                          typname.name
                            .toLowerCase()
                            .toString()
                            .indexOf(searchcouponTypes.toLowerCase()) !== -1
                        )
                          return (
                            shpname.shopName
                              .toLowerCase()
                              .toString()
                              .indexOf(search.toLowerCase()) !== -1
                          );
                        console.log(
                          typname.name
                            .toLowerCase()
                            .toString()
                            .indexOf(searchcouponTypes.toLowerCase())
                        );
                      } else {
                        if (
                          y &&
                          coupon.newPrice <= range &&
                          typname.name
                            .toLowerCase()
                            .toString()
                            .indexOf(searchcouponTypes.toLowerCase()) !== -1
                        )
                          return y;
                        if (
                          shpname.shopName
                            .toLowerCase()
                            .toString()
                            .indexOf(search.toLowerCase()) !== -1 &&
                          coupon.newPrice <= range &&
                          typname.name
                            .toLowerCase()
                            .toString()
                            .indexOf(searchcouponTypes.toLowerCase()) !== -1
                        )
                          return (
                            shpname.shopName
                              .toLowerCase()
                              .toString()
                              .indexOf(search.toLowerCase()) !== -1
                          );
                      }
                    }
                  })
                  .map((coupon) => (
                    <Col key={coupon._id} sm={12} md={6} lg={4} xl={3}>
                      <Coupon coupon={coupon} />
                    </Col>
                  ))}
              </Row>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
