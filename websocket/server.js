import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });
let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  console.log("connection");
  ws.on("message", (message) => {
    message = JSON.parse(message);
    clients.forEach((client) => {
      if (client !== ws) client.send(JSON.stringify(message));
    });
  });
  ws.on("close", () => {
    clients.forEach((client) => {
      client.send(JSON.stringify({ message: "Пользователь отключился" }));
    });
  });
});
