import { io } from "socket.io-client";

// Connect to the WebSocket server
const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to WebSocket server:", socket.id);

  // Send a test message after connection
  socket.emit("message", { user: "Client", text: "Hello from client.ts!" });
});

socket.on("message", (data) => {
  console.log("Received message:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
