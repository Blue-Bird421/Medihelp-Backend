require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Pass WebSocket instance to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


io.on('connection', (socket) => {
  socket.on('joinDistressCall', (callId) => {
    socket.join(callId);
  });

  socket.on('updateLocation', (callId, location) => {
    io.to(callId).emit('locationUpdate', location);
  });
});
