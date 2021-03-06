import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Coupon = ({ coupon }) => {
  console.log(coupon);
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/coupon/${coupon._id}`}>
        <Card.Img src={coupon.image} variant='top' />
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

        <Card.Text> מחיר חדש ${coupon.newPrice}</Card.Text>

        <Card.Text> מחיר קודם ${coupon.oldPrice}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Coupon;
