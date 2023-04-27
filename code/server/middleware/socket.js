require("dotenv").config();

const io = require('socket.io')(process.env.SOCKET,{
  cors:{
    origin:['http://localhost:3000']
  }
});

io.on('connection', (socket) => {

  socket.on('join room',(roomName)=>{
    socket.join(roomName);
  })

  socket.on('leave room',(roomName)=>{
    socket.leave(roomName);
  })

  socket.on('send_message', (message) => {
    io.to(message.senderID).emit('message', message);
    io.to(message.receiverID).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});