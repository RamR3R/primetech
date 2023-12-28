const http = require('http');
const express = require('express');
const WebSocket = require('websocket');

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.server({ httpServer: server });

const connectedClients = {};

// Function to send PING to all connected clients
function sendPing() {
    Object.keys(connectedClients).forEach((clientId) => {
      const client = connectedClients[clientId];
      client.connection.send('PING');
      console.log(`Server sent PING to Client ${clientId}`);
      client.isAlive = false;
  
      // Set a timeout to check for PONG response within 5 seconds
      client.pingTimeout = setTimeout(() => {
        if (!client.isAlive) {
          // If no PONG received, consider client disconnected
          delete connectedClients[clientId];
          console.log(`Client ${clientId} disconnected`);
        }
      }, 5000);
    });
  }

// WebSocket server handling
wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    const clientId = Math.random().toString(36).substr(2, 9); // Generate random client ID
  
    connectedClients[clientId] = { connection, isAlive: true };
  
    connection.on('message', (message) => {
      if (message.utf8Data === 'PONG') {
        // Received PONG from client, mark it as alive
        connectedClients[clientId].isAlive = true;
        clearTimeout(connectedClients[clientId].pingTimeout);
        console.log(`Server received PONG from Client ${clientId}`);
      }
    });
  
    connection.on('close', () => {
      // Handle client disconnection
      delete connectedClients[clientId];
      console.log(`Client ${clientId} disconnected`);
    });
  });

// Set interval to send PING to all clients every 30 seconds
setInterval(sendPing, 3000);

// HTTP GET endpoint to return list of connected client IDs
app.get('/clients', (req, res) => {
  res.json(Object.keys(connectedClients));
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
