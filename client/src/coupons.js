import image from './img/tshirt.jpg';

const coupons = [
  {
    _id: '12345',

    name: 't-shirt',

    image: image,

    inStock: false,

    expireDate: Date('December 17, 1995 03:24:00'),

    countInStock: 0,

    couponCode: '123456',

    newPrice: 19.99,

    oldPrice: 29.99,

    description: 't-shirt',

    //shop: 'zara',

    //   couponType: 'clothing',

    //   order: []
  },
  {
    _id: '1234',

    name: 't-shirt',

    image: image,

    inStock: true,

    countInStock: 1,

    expireDate: Date('December 17, 1995 03:24:00'),

    couponCode: '123456',

    newPrice: 19.99,

    oldPrice: 29.99,

    description: 't-shirt',

    //   shop: 'zara',

    //   couponType: 'clothing',

    //   order: []
  },
  {
    _id: '123',

    name: 't-shirt',

    image: image,

    inStock: true,

    couponCode: '123456',

    expireDate: Date('December 17, 1995 03:24:00'),

    countInStock: 1,

    newPrice: 19.99,

    oldPrice: 29.99,

    description: 't-shirt',

    //   shop: 'zara',

    //   couponType: 'clothing',

    //   order: []
  },
];

export default coupons;
