import { createClient } from "npm:redis@4.6.4";
import { serve } from "https://deno.land/std@0.222.1/http/server.ts";

// Set up Redis client
const redisClient = createClient({
  url: "redis://redis:6379",
  pingInterval: 1000,
});

await redisClient.connect();

const subscriptions = new Map();

const handleRequest = async (request) => {
  const { socket, response } = Deno.upgradeWebSocket(request);

  socket.onopen = () => {
    console.log("WebSocket connection opened");

    const url = new URL(request.url);
    const userID = url.searchParams.get("userID");

    if (userID) {
      const channel = `grading_result_${userID}`;

      if (!subscriptions.has(userID)) {
        console.log(`Subscribing to Redis channel: ${channel}`);
        redisClient.subscribe(channel, (message) => {
          console.log(`Received message from Redis channel ${channel}:`, message);
          socket.send(message);
        });
        subscriptions.set(userID, channel);
      }

      socket.onclose = () => {
        console.log("WebSocket connection closed");
        // Unsubscribe from the Redis channel on WebSocket close
        redisClient.unsubscribe(subscriptions.get(userID));
        subscriptions.delete(userID);
      };

      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
      };
    } else {
      console.error("No userID provided, cannot subscribe to Redis channel");
      socket.close(4001, "Missing userID");
    }
  };

  socket.onmessage = (event) => {
    console.log("Received message from client:", event.data);
    // Handle incoming WebSocket messages if needed
  };

  return response;
};

// Serve WebSocket on port 7788
serve(handleRequest, { port: 7788 });
console.log("WebSocket server running on ws://localhost:7788");
