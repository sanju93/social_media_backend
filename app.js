import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import "./config/passport_jwt.js";
import "./config/mongoose.js";
import { Server } from "socket.io";
import { createServer } from "http";
import jwt from 'jsonwebtoken';
import Chat_ID from './models/chatId.js';

let app = express();
dotenv.config();

let server = createServer(app);

let io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});



io.on("connection", (socket) => {
  
  console.log("connection established");
 
  socket.on('fetching_socket_id',async (data) => {
    
    let user = jwt.verify(data.online_user,process.env.secret);
    console.log(user.data._id)

    //check the socket id in database

    let document = await Chat_ID.findOne({
      chat_1 : user.data._id,
      chat_2 : data.id
    })

    if (!document){
      document = await Chat_ID.findOne({
        chat_2 : user.data._id,
        chat_1 : data.id
      })

      if (!document){
      document =  await Chat_ID.create({
          chat_1 : user.data._id,
          chat_2 : data.id,
          socket_id : socket.id
        })

        socket.join(document.socket_id);
        console.log("jioned the room",document.socket_id);
        socket.to(document.socket_id).emit("joined room",`you have joined in this room ${document.socket_id}`);
      }else{
        socket.join(document.socket_id);
        console.log("jioned the room",document.socket_id);
        socket.to(document.socket_id).emit("joined room",`you have joined in this room ${document.socket_id}`);
      }
    }else{

      socket.join(document.socket_id);
      console.log("jioned the room",document.socket_id);
      socket.to(document.socket_id).emit("joined room",`you have joined in this room ${document.socket_id}`);

      
      
    }

    socket.on('newMessage',(data) => {
   
      socket.broadcast.to(document.socket_id).emit("new",data.chat);
    })

  
  })
 

 


 

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    // allowedHeaders : ["application/json","multipart/form-data","Authorization"]
  })
);

const port = 8000 || process.env.port;
app.use(express.json());
// app.use(express.urlencoded());

app.use("/", router);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Server running on port", port);
});
