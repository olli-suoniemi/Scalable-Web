import { serve } from "https://deno.land/std@0.222.1/http/server.ts";

const message = (user, message) => JSON.stringify({ user, message });

const handleRequest = async (request) => {
  const { socket, response } = Deno.upgradeWebSocket(request);
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname === '/api/json-ws') {

    let interval = setInterval(() => {
      socket.send(message("bob", "Hello world!"));
    }, 1000);
  
    socket.onclose = () => {
      clearInterval(interval);
    };
  
    return response;
  };
};

serve(handleRequest, { port: 7777 });
