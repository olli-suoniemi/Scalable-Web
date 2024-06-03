import { serve } from "https://deno.land/std@0.222.1/http/server.ts";

const message = (user, message) => new TextEncoder().encode(`data: ${JSON.stringify({ user, message })}\n\n`);

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname === '/api/json-sse') {
    let interval;

    const body = new ReadableStream({
      start(controller) {
        interval = setInterval(() => {
          controller.enqueue(message("bob", "Hello world!")); // Replace "bob" and "Hello world!" with actual user and message
        }, 1000);
      },
      cancel() {
        clearInterval(interval);
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
