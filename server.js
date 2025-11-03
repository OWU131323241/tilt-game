const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "public");
const htmlPath = path.join(publicPath, "tilt-start-game.html");

// ログでパス確認（Renderのログに出る）
console.log("Public path:", publicPath);
console.log("HTML file exists:", fs.existsSync(htmlPath));

app.use(express.static(publicPath));

// ルートアクセス時にHTML返す
app.get("/", (req, res) => {
  res.sendFile(htmlPath);
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
