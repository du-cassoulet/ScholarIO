import { Elysia } from "elysia";
import teacher from "./teacher";
import parent from "./parent";
import school from "./school";
import student from "./student";
import auth from "./auth";

export default new Elysia({ prefix: "/api" })
  .get("/", () => "OK")
  .use(auth)
  .use(teacher)
  .use(parent)
  .use(school)
  .use(student);
