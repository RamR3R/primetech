const WebSocket = require('websocket');

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
      console.log('WebSocket client disconnected');
    });
  
    connection.on('message', (message) => {
      if (message.utf8Data === 'PING') {
        connection.send('PONG');
        console.log('Client sent PONG to server');
      }
    });
  
  // Function to send PONG to server periodically
  function sendPong() {
    connection.send('PONG');
  }
  
  // Set interval to send PONG to server every 3 seconds
  setInterval(sendPong, 8080);
});

// Connect to WebSocket server
client.connect('ws://localhost:8080');
