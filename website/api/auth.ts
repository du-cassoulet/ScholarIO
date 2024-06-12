import moment, { type Moment } from "moment";
import "moment/locale/fr";

moment.locale("fr");

export enum Role {
  Student = "student",
  Parent = "parent",
  Teacher = "teacher",
  School = "school",
}

export type User = {
  role: Role.School;
  _id: string;
  email: string;
  name: string;
  createdAt: Moment;
  updatedAt: Moment;
};

export async function authenticate(token: string): Promise<User> {
  const res = await fetch("http://127.0.0.1:8080/api/auth", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
  });

  const user = await res.json();

  user.createdAt = moment(user.createdAt);
  user.updatedAt = moment(user.updatedAt);

  return user;
}
