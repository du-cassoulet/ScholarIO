import { Elysia } from "elysia";
import auth from "./auth";

export default new Elysia({ prefix: "/student" }).use(auth);
