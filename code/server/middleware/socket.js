require("dotenv").config();

const io = require('socket.io')(process.env.SOCKET,{
  cors:{
    origin:['http://localhost:3000']
  }
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('send_message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});