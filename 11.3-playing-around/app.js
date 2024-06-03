import { serve } from "https://deno.land/std@0.222.1/http/server.ts";

const sockets = new Set();

const sendMessage = (event) => {
  sockets.forEach((socket) => socket.send(event.data));
};

const handleRequest = async (request) => {
  const { socket, response } = Deno.upgradeWebSocket(request);

  sockets.add(socket);

  socket.onclose = () => {
    sockets.delete(socket);
  };

  socket.onmessage = sendMessage;

  return response;
};

serve(handleRequest, { port: 7777 });