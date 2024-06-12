import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import { Student, Parent, Role } from "../../models";

export default new Elysia({ prefix: "/auth" })
  .use(jwt({ name: "jwt", secret: Bun.env.JWT_SECRET! }))
  .post(
    "/register",
    async ({ body, set, jwt, error }) => {
      const { first_name, last_name, email, password, parent_id } = body;

      if (await Student.exists({ email })) {
        return error(400, "Email already exists");
      }

      const parent = await Parent.findById(parent_id);

      if (!parent) {
        return error(400, "Parent not found");
      }

      const user = new Student({
        firstName: first_name,
        lastName: last_name,
        email,
        hash: password,
        parent: parent_id,
      });

      parent.children.push(user.id);

      await user.save();
      await parent.save();

      set.status = 201;

      return { response: await jwt.sign({ id: user.id, role: Role.Student }) };
    },
    {
      body: t.Object({
        first_name: t.String({ minLength: 2, maxLength: 48 }),
        last_name: t.String({ minLength: 2, maxLength: 48 }),
        email: t.String({ format: "email", minLength: 3, maxLength: 256 }),
        password: t.String({ minLength: 8, maxLength: 256 }),
        parent_id: t.String(),
      }),
      response: t.Object({
        response: t.String(),
      }),
    }
  );
