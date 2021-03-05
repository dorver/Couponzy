let bcrypt = require('bcrypt');

// Initial Schema {   User   } 

const userInit = [

    // Admins
    {
        firstName: 'יעל', 
        lastName: 'שוהם', 
        email: 'admin@admin.com', 
        password: bcrypt.hashSync('12346', 10), 
        phoneNumber: '0527777777', 
        birthday: '1985-12-06', 
        gender: false, 
        pictureName: 'assets/content/avatar-3.jpg', 
        isAdmin: true, 
        isCustomer: false, 
        orders: []._id
    },
    // Sellers
    {firstName: 'אבי', lastName: 'ירקון', email: 'sell1@sell.com', password: bcrypt.hashSync('12346', 10), phoneNumber: '0521111111', birthday: '1990-01-10', gender: true, pictureName: 'assets/content/avatar-1.jpg', isSeller: true, isCustomer: false, orders: []._id},
    {firstName: 'איילה', lastName: 'לוי', email: 'sell2@sell.com', password: bcrypt.hashSync('12346', 10), phoneNumber: '0522222222', birthday: '1992-02-15', gender: false, pictureName: 'assets/content/avatar-5.jpg', isSeller: true, isCustomer: false, orders: []._id},
    {firstName: 'אביב', lastName: 'גפן', email: 'sell3@sell.com', password: bcrypt.hashSync('12346', 10), phoneNumber: '0523333333', birthday: '2000-03-03', gender: true, pictureName: 'assets/content/avatar-2.jpg', isSeller: true, isCustomer: false, orders: []._id},
    {firstName: 'יורם', lastName: 'גאון', email: 'sell4@sell.com', password: bcrypt.hashSync('12346', 10), phoneNumber: '0521212121', birthday: '1998-10-06', gender: true, pictureName: 'assets/content/avatar-1.jpg', isSeller: true, isCustomer: false, orders: []._id},
    {firstName: 'ליאת', lastName: 'יצחק', email: 'sell5@sell.com', password: bcrypt.hashSync('12346', 10), phoneNumber: '0521313131', birthday: '1985-08-12', gender: false, pictureName: 'assets/content/avatar-5.jpg', isSeller: true, isCustomer: false, orders: []._id},
    {firstName: 'שרה', lastName: 'כוכבי', email: 'sell6@sell.com', password: bcrypt.hashSync('12346', 10), phoneNumber: '0521414141', birthday: '1993-04-20', gender: false, pictureName: 'assets/content/avatar-3.jpg', isSeller: true, isCustomer: false, orders: []._id},
    // Customers
    {firstName: 'ירון', lastName: 'מנחם', email: 'c1@c.com', password: bcrypt.hashSync('12346', 10), phoneNumber: '0524444444', birthday: '2000-12-12', gender: true, pictureName: 'assets/content/avatar-1.jpg', orders: []._id},
    {firstName: 'דורית', lastName: 'אברהם', email: 'c2@c.com', password: bcrypt.hashSync('12346', 10), phoneNumber: '0525555555', birthday: '2001-11-05', gender: false, pictureName: 'assets/content/avatar-5.jpg', orders: []._id},
    {firstName: 'בני', lastName: 'בנימין', email: 'c3@c.com', password: bcrypt.hashSync('12346', 10), phoneNumber: '0526666666', birthday: '1996-07-11', gender: true, pictureName: 'assets/content/avatar-2.jpg', orders: []._id}
    
];

exports.userInit = userInit;
