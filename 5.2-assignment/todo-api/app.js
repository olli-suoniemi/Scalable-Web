import { postgres } from "./deps.js";

const sql = postgres({});

const handleGetTodo = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  const result = await sql`SELECT * FROM todos WHERE id = ${id}`;

  if (result && result.length > 0) {
    return Response.json(result[0]);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

const handleGetTodos = async (request) => {
  const items = await sql`SELECT * FROM todos`;
  return Response.json(items);
};

const handlePostTodos = async (request) => {
  try {
    const todo = await request.json();

    // Validate if the request contains valid JSON data and has an 'item' property
    if (!todo || typeof todo !== 'object' || !todo.item) {
      return new Response("Bad Request: Invalid JSON or missing 'item'", { status: 400 });
    }

    // Check if the 'item' value is not empty
    if (todo.item.trim() === '') {
      return new Response("Bad Request: 'item' value cannot be empty", { status: 400 });
    }
    
    await sql`INSERT INTO todos (item) VALUES (${todo.item})`;
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
      fn: handleGetTodos,
    },
    {
      method: "GET",
      pattern: new URLPattern({ pathname: "/todos/:id" }),
      fn: handleGetTodo,
    },
    {
      method: "POST",
      pattern: new URLPattern({ pathname: "/todos" }),
      fn: handlePostTodos,
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
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 })
  }
};

const portConfig = { port: 7777, hostname: '0.0.0.0' };
Deno.serve(portConfig, handleRequest);