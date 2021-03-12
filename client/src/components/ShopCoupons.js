import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Shop from '../components/Shop';
import Coupon from '../components/Coupon';
import CouponPerShop from '../components/CouponPerShop';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { models } from 'mongoose';



const ShopCoupons = ({ shopCoupon }) => {
  console.log(Coupon)
  const [coupons,setCoupons]= useState([]);
  const [shops,setShops]= useState([]);
  
  useEffect(()=>{
    const fetchShops=async()=>{
      const {data} = await axios.get('/api/shops');
       setShops(data)
    }
    fetchShops()
    },[])
    useEffect(()=>{
      const fetchCoupons=async()=>{
        const {data} = await axios.get('/api/coupons');
        setCoupons(data)
      }
      fetchCoupons()
      },[])
     
    const getCoupons=((coupons)=>{
      return coupons.filter((coupon)=>{return coupon.shop==shopCoupon._id;});
    });
    const getShop=((coupon)=>{
      return shops.filter((shop)=>{return coupon.shop==shop._id})[0]._id;
    });
    

  return (
  
    <Row className='my-3 p-3 rounded'>
  
      {console.log(shopCoupon)}
      
      
      {coupons.filter((coupon)=>{
        return coupon.shop==shopCoupon._id;
      }).map((coupon)=>(
        <Col>
        <CouponPerShop coupon={coupon}></CouponPerShop>    
        </Col>
      ))}
      
   </Row>
  );
};

export default ShopCoupons;
