import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import connect from "./util/connect";
import api from "./routes";

const PORT = Number(Bun.env.PORT);

if (!PORT) {
  throw new Error("PORT is not defined");
}

connect().then(() => {
  console.log("Connected to MongoDB");
});

new Elysia()
  .use(swagger({ path: "/docs" }))
  .use(cors({ origin: "*" }))
  .use(api)
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
