import { postgres } from "../deps.js";

const sql = postgres({});

const getTodo = async (id) => {
  const result = await sql`SELECT * FROM todos WHERE id = ${id}`;
  if (result && result.length > 0) {
    return result[0];
  } else {
    return null;
  }
};

const getTodos = async () => {
  return await sql`SELECT * FROM todos`;
};

const addTodo = async (item) => {
  await sql`INSERT INTO todos (item) VALUES (${item})`;
};

const deleteTodo = async (id) => { 
  await sql`DELETE FROM todos WHERE id = ${id}`;
}

export { getTodo, getTodos, addTodo, deleteTodo};