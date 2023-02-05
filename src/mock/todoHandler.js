import { rest } from "msw";
import Todo from "./todo";
const todoDats = Todo;

export const todoHandlers = [
  rest.get("/todos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoDats));
  }),
  rest.post("/todos", (req, res, ctx) => {
    const { todo } = req.body;
    const lastItem = todoDats[todoDats.length - 1];
    todoDats.push({ id: lastItem.id + 1, ...todo });
    return res(ctx.status(200), ctx.json(todoDats));
  }),
];
