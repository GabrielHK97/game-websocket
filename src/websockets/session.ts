import ws from "ws";
import * as dotenv from "dotenv";

dotenv.config();

var sessionWS = new ws.Server({ port: 3002 });

sessionWS.on("connection", (websocket) => {
  websocket.on("message", (message) => {
    const data = JSON.parse(message.toString());
    if (data.secretWS !== process.env.SECRET_WS) {
      websocket.close();
    }
    sessionWS.clients.forEach((client) => {
      if (client !== websocket && client.readyState === ws.WebSocket.OPEN) {
        client.send(
          JSON.stringify({ username: data.username, token: data.token })
        );
      }
    });
  });
});
