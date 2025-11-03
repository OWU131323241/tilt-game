// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
  console.log("client connected:", socket.id);

  socket.on("join", room => {
    socket.join(room);
    console.log(`${socket.id} joined ${room}`);
  });

  socket.on("sensor", data => {
    io.to("game").emit("sensor", data);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
