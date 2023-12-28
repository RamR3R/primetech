const WebSocket = require('websocket');
require("dotenv").config();

const client = new WebSocket.client();

client.on('connectFailed', (error) => {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', (connection) => {
    console.log('WebSocket client connected');

    connection.on('error', (error) => {
      console.log('Connection Error: ' + error.toString());
    });
  
    connection.on('close', () => {
      console.log('Client disconnected');
    });
  
    connection.on('message', (message) => {
      if (message.utf8Data === 'PING') {
        connection.send('PONG');
        console.log('Client sent PONG to server');
      }
    });
  
  function sendPong() {
    connection.send('PONG');
  }
});

const PORT = process.env.PORT || 3030;
// Connect to WebSocket server
client.connect(`ws://localhost:${PORT}`);
