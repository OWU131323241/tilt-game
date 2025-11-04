// server.js (更新版)
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ログ表示用
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// static 配信先（public が正しければそのまま、build の場合は 'build' に変更）
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// SPA の場合、全ての未定義 GET に index.html を返す
app.get("*", (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"), err => {
    if (err) {
      console.error("sendFile error:", err);
      res.status(500).send("Server error");
    }
  });
});

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
const HOST = process.env.HOST || "0.0.0.0";
server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
