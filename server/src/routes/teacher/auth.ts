import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import { Role, Teacher } from "../../models";

export default new Elysia({ prefix: "/auth" })
  .use(jwt({ name: "jwt", secret: Bun.env.JWT_SECRET! }))
  .post(
    "/register",
    async ({ body, set, jwt, cookie: { auth }, error }) => {
      const { first_name, last_name, email, password } = body;

      if (await Teacher.exists({ email })) {
        return error(400, "Email already exists");
      }

      const user = new Teacher({
        firstName: first_name,
        lastName: last_name,
        email,
        hash: password,
      });

      await user.save();

      auth.set({
        value: await jwt.sign({ id: user.id, role: Role.Teacher }),
        httpOnly: true,
        maxAge: 604800,
        path: "/",
      });

      set.status = 201;

      return { response: "OK" };
    },
    {
      body: t.Object({
        first_name: t.String({ minLength: 2, maxLength: 48 }),
        last_name: t.String({ minLength: 2, maxLength: 48 }),
        email: t.String({ format: "email", minLength: 3, maxLength: 256 }),
        password: t.String({ minLength: 8, maxLength: 256 }),
      }),
      response: t.Object({
        response: t.String(),
      }),
    }
  );
