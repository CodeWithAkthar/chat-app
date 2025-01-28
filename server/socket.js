import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessageModel.js";
import User from "./models/UserModel.js"; 

console.log("1");

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  console.log("2");
  const userSocketMap = new Map();
  
  const disconnect = (socket) => {
    console.log(`Client disconnected:${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };
  
  console.log("3");
  const sendMessage = async (message) => {
    try {
      // Get socket IDs
      const senderSocketId = userSocketMap.get(message.sender);
      const recipientSocketId = userSocketMap.get(message.recipient);
      
      // Create message and populate in one step
      const messageData = await Message.create(message);
      await messageData.populate([
        { path: "sender", select: "id email firstName lastName image color" },
        { path: "recipient", select: "id email firstName lastName image color" }
      ]);
  
      // For debugging
      console.log({
        senderSocketId,
        recipientSocketId,
        messageData
      });
  
      // Send to recipient if they're connected
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", messageData);
      }
  
      // Send to sender if they're connected
      if (senderSocketId) {
        io.to(senderSocketId).emit("receiveMessage", messageData);
      }
  
      return messageData;
    } catch (error) {
      console.error("Error in sendMessage:", error);
      
      // Notify sender of failure if they're connected
      if (senderSocketId) {
        io.to(senderSocketId).emit("messageError", {
          error: "Failed to send message",
          details: error.message
        });
      }
      
      throw error;
    }
  };
  
  console.log("8");
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    
    console.log("9");
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`user connected:${userId} with socket ID:${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }
    console.log("10");
    
    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
