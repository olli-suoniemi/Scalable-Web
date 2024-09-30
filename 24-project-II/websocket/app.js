import { createClient } from "npm:redis@4.6.4";
import { serve } from "https://deno.land/std@0.222.1/http/server.ts";

// Set up Redis client
const redisClient = createClient({
  url: "redis://redis:6379",
  pingInterval: 1000,
});

await redisClient.connect();

// Function to handle WebSocket requests
const handleRequest = async (request) => {
  const { socket, response } = Deno.upgradeWebSocket(request);

  socket.onopen = () => {
    console.log("WebSocket connection opened");
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };
  
  socket.onmessage = (event) => {
    console.log("Received message from client:", event.data);
  };

  return response;

};

// Serve WebSocket on port 7788
serve(handleRequest, { port: 7788 });
console.log("WebSocket server running on ws://localhost:7788");
