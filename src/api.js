import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

// message: { name: String, text: String }
function sendChatMessage(message) {
  socket.emit('chat message', message);
  // socket.on('chat message', message => cb(null, message));
}

// cb: function to be called when a new message is recieved
function recieveChatMessage(cb) {
  socket.on('chat message', message => cb(null, message));
}

// function ChatMessageReceived(cb) 
// }

export { sendChatMessage, recieveChatMessage };