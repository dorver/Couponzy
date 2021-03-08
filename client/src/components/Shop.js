import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Shop = ({ shop }) => {
  console.log(shop);
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>

        <Card.Text>
        <Card.Text as='div'>
            <div className='my-3'>{shop.name}</div>
          </Card.Text>
        </Card.Text>
      <Card.Text>
        <Card.Img src={shop.pictureName} style={{width:117,height:38.69}} variant='top' />
      </Card.Text>
      
      </Card.Body>
    </Card>
  );
};

export default Shop;
