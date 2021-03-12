import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Order = ({ order }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/coupon/${order.coupon._id}`}>
        <Card.Img src={order.coupon.pictureName} variant='top' />
      </Link>

      <Card.Body>
        <Link dir='rtl' to={`/coupon/${order.coupon._id}`}>
          <Card.Title dir='rtl' as='div'>
            <strong>{order.coupon.name}</strong>
          </Card.Title>
        </Link>
        {order.coupon.inStock ? (
          <Card.Text as='div'>
            <div className='my-3'>במלאי</div>
          </Card.Text>
        ) : (
          <Card.Text as='div'>
            <div className='my-3'>לא במלאי</div>
          </Card.Text>
        )}

        <Card.Text> מחיר חדש ${order.coupon.newPrice}</Card.Text>

        <Card.Text>
          {' '}
          מחיר קודם ₪<del>{order.coupon.oldPrice}</del>
        </Card.Text>

        <Card.Text>
          {' '}
          תאריך מימוש {new Date(order.orderDate).toLocaleDateString('he-IL')}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Order;
