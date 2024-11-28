import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("Hi there from express");
});

const server = app.listen(8080, () => {
  console.log(`server running on port 8080`);
});

const wss = new WebSocketServer({ server });
const globalSockets = {};

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    const parsedData = JSON.parse(data);

    if (parsedData.type === "room") {
      const { roomId } = parsedData.payload;

      if (!globalSockets[roomId]) {
        globalSockets[roomId] = [];
      }

      globalSockets[roomId].push(ws);

      console.log(`User connected to room: ${roomId}`);
      ws.send(`You are connected to room ${roomId} successfully`)
    } 
    else if (parsedData.type === "message") {
      const { roomId, person, message } = parsedData.payload;

      if (globalSockets[roomId]) {
        globalSockets[roomId].forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(`${person}: ${message}`);
          }
        });

        console.log(`Message from ${person} to room ${roomId}: ${message}`);
      } else {
        console.log(`Room ${roomId} does not exist or no users are connected.`);
      }
    }
  });

  // ws.on('close', () => {
  //   for (const roomId in globalSockets) {
  //     globalSockets[roomId] = globalSockets[roomId].filter(client => client !== ws);

  //     if (globalSockets[roomId].length === 0) {
  //       delete globalSockets[roomId];
  //     }
  //   }

  //   console.log('A user disconnected');
  // });

  ws.send('Hello! You are connected to the WebSocket server successfully!');
});
