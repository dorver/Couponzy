import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Shop from '../components/Shop';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { models } from 'mongoose';




const CouponPerShop = ({ coupon }) => {
  console.log(coupon);
  const [shops,setShops]= useState([]);
  
  useEffect(()=>{
    const fetchShops=async()=>{
      const {data} = await axios.get('/api/shops');
       setShops(data)
    }
    fetchShops()
    },[])
     
    const getShopname=((shopName)=>{
      console.log(shops.filter((shop)=>{return shopName==shop._id}));
    });
    

  return (
  
    <Card className='my-3 p-3 rounded'>
  
      <Link to={`/coupon/${coupon._id}`}>
        <Card.Img src={coupon.pictureName} style={{width:221,height:276.98}}variant='top' />
      </Link>

      <Card.Body>
        <Link dir='rtl' to={`/coupon/${coupon._id}`}>
          <Card.Title dir='rtl' as='div'>
            <strong>{coupon.name}</strong>
          </Card.Title>
        </Link>
        {coupon.inStock ? (
          <Card.Text as='div'>
            <div className='my-3'>במלאי</div>
          </Card.Text>
        ) : (
          <Card.Text as='div'>
            <div className='my-3'>לא במלאי</div>
          </Card.Text>
        )}

        <Card.Text> מחיר חדש ₪{coupon.newPrice}</Card.Text>

        <Card.Text> מחיר קודם ₪<del>{coupon.oldPrice}</del></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CouponPerShop;
