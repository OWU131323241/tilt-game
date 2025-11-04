const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

// publicフォルダを静的ファイルとして扱う
app.use(express.static(path.join(__dirname, "public")));

// 👇 これを追加（トップページを指定）
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tilt-start-game.html"));
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
