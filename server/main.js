
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: { origin: "*" }
});


io.on("connect", ()=>{
  console.log("Client connected");
})


app.use(express.static("client"));

httpServer.listen(5000);