import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import { Parent, Role, School, Student, Teacher } from "../models";

export default new Elysia({ prefix: "/auth" })
  .use(jwt({ name: "jwt", secret: Bun.env.JWT_SECRET! }))
  .get("/", async ({ cookie: { auth }, jwt, error }) => {
    const res = await jwt.verify(auth.value);
    if (!res) return error(401, "Unauthorized");

    let user: any;

    switch (res.role) {
      case Role.Student:
        user = await Student.findById(res.id);
        break;

      case Role.Parent:
        user = await Parent.findById(res.id);
        break;

      case Role.Teacher:
        user = await Teacher.findById(res.id);
        break;

      case Role.School:
        user = await School.findById(res.id);
        break;

      default:
        return error(401, "Unauthorized");
    }

    if (!user) return error(404, "User not found");
    return { role: res.role, ...user.toJSON() };
  })
  .post(
    "/login",
    async ({ body, jwt, cookie: { auth }, error }) => {
      const { email, password } = body;

      let user: any = await Teacher.findOne({ email });
      user ||= await Parent.findOne({ email });
      user ||= await Student.findOne({ email });
      user ||= await School.findOne({ email });

      if (!user || !user.verifyPassword(password)) {
        return error(401, "Invalid email or password");
      }

      let role: Role;
      if (user instanceof Teacher) role = Role.Teacher;
      else if (user instanceof Parent) role = Role.Parent;
      else if (user instanceof Student) role = Role.Student;
      else if (user instanceof School) role = Role.School;
      else return error(500, "Internal server error");

      auth.set({
        value: await jwt.sign({ id: user.id, role }),
        httpOnly: true,
        maxAge: 604800,
        path: "/",
      });

      return { response: "OK" };
    },
    {
      body: t.Object({
        email: t.String({ format: "email", minLength: 3, maxLength: 256 }),
        password: t.String({ minLength: 8, maxLength: 256 }),
      }),
      response: t.Object({
        response: t.String(),
      }),
    }
  );
