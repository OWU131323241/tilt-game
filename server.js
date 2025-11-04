const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 10000;

// public フォルダを静的ファイルとして扱う
app.use(express.static(path.join(__dirname, "public")));

// ✅ トップページでゲームHTMLを表示
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tilt-start-game.html"));
});

// ✅ tilt-game.html でアクセスした場合も同じファイルを表示
app.get("/tilt-game.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tilt-start-game.html"));
});

// ✅ スマホ用ページ（もしあるなら）
app.get("/smart.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "smart.html"));
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
