var ws = require("ws");
var sessionWS = new ws.Server({ port: 3002 });

sessionWS.on("connection", (websocket) => {
  websocket.on("message", (message) => {
    console.log(message.toString());
    sessionWS.clients.forEach((client) => {
      if (client !== websocket && client.readyState === ws.WebSocket.OPEN) {
        client.send(JSON.stringify({ token: message.toString() }));
      }
    });
  });
});
