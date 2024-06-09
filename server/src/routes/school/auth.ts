import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import { Role, School } from "../../models";

export default new Elysia({ prefix: "/auth" })
  .use(jwt({ name: "jwt", secret: Bun.env.JWT_SECRET! }))
  .post(
    "/register",
    async ({ body, set, jwt, cookie: { auth }, error }) => {
      const { name, email, password } = body;

      if (await School.exists({ email })) {
        return error(400, "Email already exists");
      }

      const user = new School({
        name: name,
        email,
        hash: password,
      });

      await user.save();

      auth.set({
        value: await jwt.sign({ id: user.id, role: Role.School }),
        httpOnly: true,
        maxAge: 604800,
        path: "/",
      });

      set.status = 201;

      return { response: "OK" };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 2, maxLength: 64 }),
        email: t.String({ format: "email", minLength: 3, maxLength: 256 }),
        password: t.String({ minLength: 8, maxLength: 256 }),
      }),
      response: t.Object({
        response: t.String(),
      }),
    }
  );
