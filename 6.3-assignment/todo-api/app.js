import * as todoService from "./services/todoService.js";
import { cacheMethodCalls } from "./util/cacheUtil.js";

const SERVER_ID = crypto.randomUUID();

const cachedTodoService = cacheMethodCalls(todoService, ["addTodo", "deleteTodo"]);

const handleGetRoot = async (request) => {
  return new Response(`Hello from ${ SERVER_ID }`);
};

const handleGetTodo = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  return Response.json(await cachedTodoService.getTodo(id));
};

const handleGetTodos = async (request) => {
  return Response.json(await cachedTodoService.getTodos());
};

const handlePostTodos = async (request) => {
  try {
    const todo = await request.json();
    await cachedTodoService.addTodo(todo.item);
    return new Response("OK", { status: 200 });

  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

const handleDeleteTodo = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  try {
    await cachedTodoService.deleteTodo(id);
    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
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
    {
      method: "GET",
      pattern: new URLPattern({ pathname: "/" }),
      fn: handleGetRoot,
    },
    {
      method: "DELETE",
      pattern: new URLPattern({ pathname: "/todos/:id" }),
      fn: handleDeleteTodo,
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