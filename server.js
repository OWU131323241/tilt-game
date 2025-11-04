const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 10000;

// publicフォルダを静的ファイルとして扱う
app.use(express.static(path.join(__dirname, "public")));

// ✅ tilt-game.html 用ルート
app.get("/tilt-game.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tilt-game.html"));
});

// ✅ smart.html 用ルート
app.get("/smart.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "smart.html"));
});

// ✅ デフォルト（何も指定しなかった場合は tilt-game.html）
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tilt-game.html"));
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
