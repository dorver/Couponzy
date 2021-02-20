const express = require('express');
const connectDB = require('./config/db');
    
//const Role = connectDB.role;
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false}));

app.use(cors());

app.get('/', (req,res) => res.send('API Running'));

//Define Routes
//app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/coupons', require('./routes/api/coupons'));
app.use('/api/shops', require('./routes/api/shops'));
app.use('/api/user', require('./routes/api/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// initial();

// function initial() {
//     console.log("!!");
//     Role.estimatedDocumentCount((err, count) => {
//       if (!err && count === 0) {
//         new Role({
//           name: "customer"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'customer' to roles collection");
//         });
  
//         new Role({
//           name: "seller"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'seller' to roles collection");
//         });
  
//         new Role({
//           name: "admin"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'admin' to roles collection");
//         });
//       }
//     });

