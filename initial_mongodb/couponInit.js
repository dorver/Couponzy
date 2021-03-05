// Initial Schema {   Coupon   } 
let couponInit = [
    // ZARA
    {name: 'חולצה קצרה לאישה', inStock: true, expireDate: '2021-06-20', couponCode: '121212', newPrice: 99.9, oldPrice: 120, decription: 'חולצה איכותית ונוחה מאוד לאישה', pictureName: 'assets/content/card-7.jpg', orders: []._id},
    {name: 'מכנס גינס לאישה', inStock: true, expireDate: '2021-06-20', couponCode: '131313', newPrice: 99.9, oldPrice: 120, decription: 'מכנס איכותי ונוח מאוד לאישה', pictureName: 'assets/content/card-7.jpg', orders: []}._id,

    // CASTRO MEN
    {name: 'חולצה קצרה לגבר', inStock: true, expireDate: '2021-06-20', couponCode: '222222', newPrice: 99.9, oldPrice: 120, decription: 'חולצה איכותית ונוחה מאוד לגבר', pictureName: 'assets/content/card-7.jpg', orders: []._id},
    {name: 'מכנס גינס לגבר', inStock: true, expireDate: '2021-06-20', couponCode: '333333', newPrice: 99.9, oldPrice: 120, decription: 'מכנס איכותי ונוח מאוד לגבר', pictureName: 'assets/content/card-7.jpg', orders: []._id},

    // הום סנטר
    {name: 'מברגה אימפקט', inStock: true, expireDate: '2021-06-20', couponCode: '444444', newPrice: 99.9, oldPrice: 120, decription: 'מברגת אימפקט עוצמתית במיוחד עם 226 ניוטון', pictureName: 'assets/content/card-7.jpg', orders: []._id},
    {name: 'וילון מקלחת', inStock: true, expireDate: '2021-06-20', couponCode: '555555', newPrice: 99.9, oldPrice: 120, decription: 'וילון מקלחת עמיד למים', pictureName: 'assets/content/card-7.jpg', orders: []._id},

    // GOLF
    {name: 'סריג גולף', inStock: true, expireDate: '2021-06-20', couponCode: '666666', newPrice: 99.9, oldPrice: 120, decription: 'סריג גולף איכותי בצבע אפור', pictureName: 'assets/content/card-7.jpg', orders: []._id},
    {name: 'מעיל לגברים', inStock: true, expireDate: '2021-06-20', couponCode: '777777', newPrice: 99.9, oldPrice: 120, decription: 'מעיל צרפתי לגברים, דק, ארוך וחזה יחיד', pictureName: 'assets/content/card-7.jpg', orders: []._id},

    // מגה ספורט
    {name: 'נעלי כדורגל', inStock: true, expireDate: '2021-06-20', couponCode: '888888', newPrice: 99.9, oldPrice: 120, decription: 'נעלי כדורגל בסגנון גרב בשילוב שרוכים, לנעליים סוליית גומי פקקים', pictureName: 'assets/content/card-7.jpg', orders: []._id},
    {name: 'הליכון מתקפל', inStock: true, expireDate: '2021-06-20', couponCode: '999999', newPrice: 99.9, oldPrice: 120, decription: 'הליכון מתקפל Kingsmith צבע שחור, שנתיים אחריות על ידי היבואן', pictureName: 'assets/content/card-7.jpg', orders: []._id},

    // KSP
    {name: 'מחשב מיני', inStock: true, expireDate: '2021-06-20', couponCode: '141414', newPrice: 99.9, oldPrice: 120, decription: 'מחשב מיני Intel NUC הכולל מעבד Intel I3-8109U', pictureName: 'assets/content/card-7.jpg', orders: []._id},
    {name: 'מדפסת אלחוטית', inStock: true, expireDate: '2021-06-20', couponCode: '151515', newPrice: 99.9, oldPrice: 120, decription: 'מדפסת אלחוטית משולבת HP Deskjet', pictureName: 'assets/content/card-7.jpg', orders: []._id}
];

exports.couponInit = couponInit;