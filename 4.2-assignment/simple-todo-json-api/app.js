const portConfig = { port: 7777 };

const todos = [];

const handleGetItems = async (request) => {
  return Response.json(todos);
};

const handlePostItems = async (request) => {
  try {
    const todo = await request.json();

    // Validate if the request contains valid JSON data
    if (!todo || typeof todo !== 'object') {
      return new Response("Bad Request: Invalid JSON", { status: 400 });
    }

    todos.push(todo);
    return new Response("OK", { status: 200 });
  } catch (error) {
    // Handle any other errors that might occur during JSON parsing
    return new Response("Bad Request: Invalid JSON", { status: 400 });
  }
};

const urlMapping = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handleGetItems,
  },
  {
    method: "POST",
    pattern: new URLPattern({ pathname: "/todos" }),
    fn: handlePostItems,
  },
];

const handleRequest = async (request) => {
  const mapping = urlMapping.find(
    (um) => um.method === request.method && um.pattern.test(request.url)
  );

  if (!mapping) {
    return new Response("Not found", { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  return await mapping.fn(request, mappingResult);
};
  
Deno.serve(portConfig, handleRequest);