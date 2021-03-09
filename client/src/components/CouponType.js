import React from 'react';
import { Link } from 'react-router-dom';
import { Card,Dropdown } from 'react-bootstrap';

const CouponType = ({ couponType }) => {
  console.log("enterd")
  console.log(couponType);
  return (

      
     <Dropdown.List>

            <div className='my-3'>{couponType.name}</div>
          
            </Dropdown.List>

  );
};

export default CouponType;
