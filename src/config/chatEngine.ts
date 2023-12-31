import { Server, Socket } from 'socket.io';

// Create a Socket.IO server instance
const io = new Server();

// Event handler for new connection
io.on('connection', (socket: Socket) => {
  console.log('A new client connected');

  // Event handler for disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

export default io;
