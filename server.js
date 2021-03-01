const express = require('express');
const connectDB = require('./config/db');
const http = require('http');
const bodyParser = require('body-parser');
//const Role = connectDB.role;
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();

// Connect Database
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));

//Init Middleware
app.use(express.json({ extended: false }));

app.use(cors({ withCredentials: false }));
                
app.get('/', (req, res) => res.send('API Running'));

//Define Routes
//app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/coupons', require('./routes/api/coupons'));
app.use('/api/shops', require('./routes/api/shops'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/branches', require('./routes/api/branches'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/couponsTypes', require('./routes/api/couponsTypes'));




const server = http.createServer(app);

const whitelist = ["http://localhost:4200", "http://localhost:3000"];

const io = socketIo(server, {
    cros: {
        origins: [whitelist],
        methods: ["GET", "POST"],
        credentials: true
    }
});

var count = 0;
io.on('connection', (socket) => {
    if (socket.handshake.headers.origin === "http://localhost:3000") {
        count++;
        socket.broadcast.emit('count', count);
        
        console.log(count);
        socket.on('disconnect', () => {
            count--;
            socket.broadcast.emit('count', count);
            console.log(count);
        });
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));








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

