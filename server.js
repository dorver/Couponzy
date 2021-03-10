const express = require('express');
const connectDB = require('./config/db');
const http = require('http');
const bodyParser = require('body-parser');
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
app.use('/brands' , require('./routes/api/brands'));




const server = http.createServer(app);

const whitelist = ["http://localhost:4200", "http://localhost:3000"];

const io = socketIo(server, {
    cros: {
        origins: [whitelist],
        methods: ["GET", "POST"],
        credentials: false
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