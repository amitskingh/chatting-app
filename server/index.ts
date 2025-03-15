import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";


const app = express();
const server = createServer(app); // Create HTTP Server

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (Change this in production)
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Listen for new client connections
io.on("connection", (socket: Socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Handle receiving messages
  socket.on("channel", (data) => {
    console.log("Received message:", data);

    // Broadcast message to all clients
    io.emit("channel", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
