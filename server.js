const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 10000;

// 静的ファイルをpublicから提供
app.use(express.static(path.join(__dirname, "public")));

// ✅ tilt-game.html 用ルート
app.get("/tilt-game.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tilt-start-game.html"));
});

// ✅ smart.html 用ルート（スマホ用ページ）
app.get("/smart.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "smart.html"));
});

// ✅ デフォルトルート
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tilt-start-game.html"));
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
