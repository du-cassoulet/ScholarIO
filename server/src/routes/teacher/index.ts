import { Elysia } from "elysia";
import auth from "./auth";

export default new Elysia({ prefix: "/teacher" }).use(auth);
