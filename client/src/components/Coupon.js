import React from 'react'
import { Card } from 'react-bootstrap'

const Coupon = ({ coupon }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/coupon/${coupon._id}`}>
                <Card.Img src={coupon.image} variant='top' />
            </a>   

            <Card.Body>
            <a href={`/coupon/${coupon._id}`}>
                <Card.Title as='div'>
                    <strong>{coupon.name}</strong>
                </Card.Title>
            </a>     

            <Card.Text as='div'>
                <div className='my-3'>
                    {coupon.inStock}  במלאי
                </div>
            </Card.Text>

            </Card.Body>

        </Card>
        
    )
}

export default Coupon
