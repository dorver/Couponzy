// Initial Schema {   User   } 
var UserInit = [
    // Sellers
    {firstName: "אבי", lastName: "ירקון", email: "a@a.com", password: "123456", phoneNumber: "0521111111", birthday: new Date(1990, 01, 10), gender: true, pictureName: "'assets/content/avatar-1.jpg'", isAdmin: false, isSeller: true, isCustomer: false, shops: "", orders: []},
    {firstName: "איילה", lastName: "לוי", email: "b@b.com", password: "123456", phoneNumber: "0522222222", birthday: new Date(1992, 02, 15), gender: false, pictureName: "'assets/content/avatar-5.jpg'", isAdmin: false, isSeller: true, isCustomer: false, shops: "", orders: []},
    {firstName: "אביב", lastName: "גפן", email: "c@c.com", password: "123456", phoneNumber: "0523333333", birthday: new Date(2000, 03, 03), gender: true, pictureName: "'assets/content/avatar-2.jpg'", isAdmin: false, isSeller: true, isCustomer: false, shops: "", orders: []},
    {firstName: "יורם", lastName: "גאון", email: "d@d.com", password: "123456", phoneNumber: "0521212121", birthday: new Date(1998, 10, 06), gender: true, pictureName: "'assets/content/avatar-1.jpg'", isAdmin: false, isSeller: true, isCustomer: false, shops: "", orders: []},
    {firstName: "ליאת", lastName: "יצחק", email: "e@e.com", password: "123456", phoneNumber: "0521313131", birthday: new Date(1985, 08, 12), gender: false, pictureName: "'assets/content/avatar-5.jpg'", isAdmin: false, isSeller: true, isCustomer: false, shops: "", orders: []},
    {firstName: "שרה", lastName: "כוכבי", email: "f@f.com", password: "123456", phoneNumber: "0521414141", birthday: new Date(1993, 04, 20), gender: false, pictureName: "'assets/content/avatar-3.jpg'", isAdmin: false, isSeller: true, isCustomer: false, shops: "", orders: []},
    // Customers
    {firstName: "ירון", lastName: "מנחם", email: "aa@aa.com", password: "123456", phoneNumber: "0524444444", birthday: new Date(2000, 12, 12), gender: true, pictureName: "'assets/content/avatar-1.jpg'", isAdmin: false, isSeller: false, isCustomer: true, shops: "", orders: []},
    {firstName: "דורית", lastName: "אברהם", email: "bb@bb.com", password: "123456", phoneNumber: "0525555555", birthday: new Date(2001, 11, 05), gender: false, pictureName: "'assets/content/avatar-5.jpg'", isAdmin: false, isSeller: false, isCustomer: true, shops: "", orders: []},
    {firstName: "בני", lastName: "בנימין", email: "cc@cc.com", password: "123456", phoneNumber: "0526666666", birthday: new Date(1996, 07, 11), gender: true, pictureName: "'assets/content/avatar-2.jpg'", isAdmin: false, isSeller: false, isCustomer: true, shops: "", orders: []},
    // Admins
    {firstName: "יעל", lastName: "שוהם", email: "aaa@aaa.com", password: "123456", phoneNumber: "0527777777", birthday: new Date(1985, 12, 06), gender: false, pictureName: "'assets/content/avatar-3.jpg'", isAdmin: true, isSeller: false, isCustomer: false, shops: "", orders: []},
    {firstName: "עדן", lastName: "רביבו", email: "bbb@bbb.com", password: "123456", phoneNumber: "0528888888", birthday: new Date(1990, 05, 14), gender: false, pictureName: "'assets/content/avatar-4.jpg'", isAdmin: true, isSeller: false, isCustomer: false, shops: "", orders: []},
    {firstName: "אבי", lastName: "נמני", email: "ccc@ccc.com", password: "123456", phoneNumber: "0529999999", birthday: new Date(1999, 09, 11), gender: true, pictureName: "'assets/content/avatar-6.jpg'", isAdmin: true, isSeller: false, isCustomer: false, shops: "", orders: []}
];

// Initial Schema {   CouponType   } 
var CouponTypeInit = [
    {name: "חולצה", coupons: []},
    {name: "מכנס", coupons: []},
    {name: "נעליים", coupons: []},
    {name: "לפטופ", coupons: []},
    {name: "הליכון", coupons: []},
    {name: "מקדחה", coupons: []}
];

// Initial Schema {   Coupon   } 
var CouponInit = [
    // ZARA
    {name: "חולצה קצרה לאישה", inStock: true, expireDate: new Date(2021,06,20), couponCode: "121212", newPrice: 99.9, oldPrice: 120, decription: "חולצה איכותית ונוחה מאוד לאישה", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},
    {name: "מכנס ג'ינס לאישה", inStock: true, expireDate: new Date(2021,06,20), couponCode: "131313", newPrice: 99.9, oldPrice: 120, decription: "מכנס איכותי ונוח מאוד לאישה", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},

    // CASTRO MEN
    {name: "חולצה קצרה לגבר", inStock: true, expireDate: new Date(2021,06,20), couponCode: "222222", newPrice: 99.9, oldPrice: 120, decription: "חולצה איכותית ונוחה מאוד לגבר", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},
    {name: "מכנס ג'ינס לגבר", inStock: true, expireDate: new Date(2021,06,20), couponCode: "333333", newPrice: 99.9, oldPrice: 120, decription: "מכנס איכותי ונוח מאוד לגבר", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},

    // הום סנטר
    {name: "מברגה אימפקט", inStock: true, expireDate: new Date(2021,06,20), couponCode: "444444", newPrice: 99.9, oldPrice: 120, decription: "מברגת אימפקט עוצמתית במיוחד עם 226 ניוטון", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},
    {name: "וילון מקלחת", inStock: true, expireDate: new Date(2021,06,20), couponCode: "555555", newPrice: 99.9, oldPrice: 120, decription: "וילון מקלחת עמיד למים", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},

    // GOLF
    {name: "סריג גולף", inStock: true, expireDate: new Date(2021,06,20), couponCode: "666666", newPrice: 99.9, oldPrice: 120, decription: "סריג גולף איכותי בצבע אפור", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},
    {name: "מעיל לגברים", inStock: true, expireDate: new Date(2021,06,20), couponCode: "777777", newPrice: 99.9, oldPrice: 120, decription: "מעיל צרפתי לגברים, דק, ארוך וחזה יחיד", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},

    // מגה ספורט
    {name: "נעלי כדורגל", inStock: true, expireDate: new Date(2021,06,20), couponCode: "888888", newPrice: 99.9, oldPrice: 120, decription: "נעלי כדורגל בסגנון גרב בשילוב שרוכים, לנעליים סוליית גומי פקקים", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},
    {name: "הליכון מתקפל", inStock: true, expireDate: new Date(2021,06,20), couponCode: "999999", newPrice: 99.9, oldPrice: 120, decription: "הליכון מתקפל Kingsmith צבע שחור, שנתיים אחריות על ידי היבואן", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},

    // KSP
    {name: "מחשב מיני", inStock: true, expireDate: new Date(2021,06,20), couponCode: "141414", newPrice: 99.9, oldPrice: 120, decription: "מחשב מיני Intel NUC הכולל מעבד Intel I3-8109U", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []},
    {name: "מדפסת אלחוטית", inStock: true, expireDate: new Date(2021,06,20), couponCode: "151515", newPrice: 99.9, oldPrice: 120, decription: "מדפסת אלחוטית משולבת HP Deskjet", pictureName: "'assets/content/card-7.jpg'", published: Date.now, couponType: "", shop: "", order: []}
];

// Initial Schema {   Shop   } 
var ShopInit = [
    {shopName: "ZARA", pictureName: "'assets/content/file-1.jpg'", coupons: [], branches: [], users: []},
    {shopName: "CASTRO MEN", pictureName: "'assets/content/file-2.jpg'", coupons: [], branches: [], users: []},
    {shopName: "הום סנטר", pictureName: "'assets/content/file-3.jpg'", coupons: [], branches: [], users: []},,
    {shopName: "GOLF", pictureName: "'assets/content/file-4.jpg'", coupons: [], branches: [], users: []},
    {shopName: "מגה ספורט", pictureName: "'assets/content/file-5.jpg'", coupons: [], branches: [], users: []},
    {shopName: "KSP", pictureName: "'assets/content/file.jpg'", coupons: [], branches: [], users: []}
];

// Initial Schema {   Branch   } 
var BranchInit = [
    // ZARA Branches
    {name: "זארה כפר סבא", city: "כפר סבא", address: "רחוב השרון 8", phoneNumber: "099967268", lat: 32.176, long: 34.894, isOpen: true, shop: "", orders: []},
    
    // CASTRO MEN Branches
    {name: "קאסטרו-מין תל אביב", city: "תל אביב", address: "בן יהודה 72", phoneNumber: "039876543", lat: 32.08, long: 34.77, isOpen: true, shop: "", orders: []},
    
    // הום סנטר Branches
    {name: "הום סנטר תל אביב", city: "תל אביב", address: "גדרה 19", phoneNumber: "035689999", lat: 32.078, long: 34.77, isOpen: true, shop: "", orders: []},
    
    // GOLF Branches
    {name: "גולף חולון", city: "חולון", address: "ההסתדרות 92", phoneNumber: "034546568", lat: 32.017, long: 34.78, isOpen: true, shop: "", orders: []},

    // מגה ספורט Branches
    {name: "מגה ספורט בת ים", city: "בת ים", address: "הרב ניסנבוים 75", phoneNumber: "036558978", lat: 32.015, long: 34.753, isOpen: true, shop: "", orders: []},

    // KSP Branches
    {name: "קי-אס-פי רמת גן", city: "רמת גן", address: "הירדן 94", phoneNumber: "035889631", lat: 32.06, long: 34.828, isOpen: true, shop: "", orders: []}
];

// Initial Schema {   Order   } 
var OrderInit = [
    {orderDate: new Date(2021,01,10), coupon: "", branche: "", user: ""},
    {orderDate: new Date(2021,01,18), coupon: "", branche: "", user: ""},
    {orderDate: new Date(2021,01,26), coupon: "", branche: "", user: ""},
    {orderDate: new Date(2021,01,31), coupon: "", branche: "", user: ""},
    {orderDate: new Date(2021,02,15), coupon: "", branche: "", user: ""},
    {orderDate: new Date(2021,02,21), coupon: "", branche: "", user: ""}
];

exports.UserInit = UserInit;
exports.CouponTypeInit = CouponTypeInit;
exports.CouponInit = CouponInit;
exports.ShopInit = ShopInit;
exports.BranchInit = BranchInit;
exports.OrderInit = OrderInit;