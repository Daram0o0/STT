const express = require("express");
const { Server } = require("http");
const socketio = require("socket.io");
const http = require("http");
const cors = require('cors');
const router = require('./router');
const app = express();
app.use(cors());

const server = http.createServer(app);

// const io = new Server(app, {
//   cors: {
//     origin: "http://localhost:5000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   },
// })

const io = socketio(server)

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on("send_msg", (data) => {
    console.log("send : ", data);
    // socket.broadcast.emit("receive_msg", data);
    setTimeout(() => {
      socket.emit("recv", data);
    }, 50)

  })

  socket.on("disconnect", (data) => {
    console.log("disconnected ", socket.id);
    socket.disconnect();
  })
})

server.listen(5000, () => {
  console.log("server is running");
})