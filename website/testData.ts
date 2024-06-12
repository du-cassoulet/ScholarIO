import moment, { type Moment } from "moment";

export type Event = {
  start: Moment;
  end: Moment;
  title: string;
  teacher: string;
  room: string;
  color: string;
};

export type Assignment = {
  description: string;
  due: Moment;
  given: Moment;
  subject: string;
  teacher: string;
  graded: boolean;
  done: boolean;
  color: string;
};

export const events: Event[] = [
  {
    start: moment().startOf("day").hours(8),
    end: moment().startOf("day").hours(10).minutes(30),
    title: "Mathématiques",
    teacher: "M. Dupont.",
    room: "A1",
    color: "#f21f43",
  },
  {
    start: moment().startOf("day").hours(10).minutes(30),
    end: moment().startOf("day").hours(12).minutes(45),
    title: "Français",
    teacher: "Mme. Dupont.",
    room: "A2",
    color: "#1f50f2",
  },
];

export const assignments: Assignment[] = [
  {
    description: "Faire les exercices 1 à 10 de la page 42.",
    due: moment().startOf("day").add(2, "days"),
    given: moment().startOf("day").subtract(1, "day"),
    subject: "Mathématiques",
    teacher: "M. Dupont.",
    graded: false,
    done: false,
    color: "#f21f43",
  },
  {
    description:
      "Faire la rédaction sur le thème de la liberté, 1 page minimum. Les fautes d'orthographe seront sanctionnées.",
    due: moment().startOf("day").add(1, "day"),
    given: moment().startOf("day").subtract(1, "day"),
    subject: "Français",
    teacher: "Mme. Dupont.",
    graded: true,
    done: false,
    color: "#1f50f2",
  },
  {
    description: "Apprendre la leçon sur les fractions.",
    due: moment().startOf("day").add(1, "days"),
    given: moment().startOf("day").subtract(1, "day"),
    subject: "Mathématiques",
    teacher: "M. Dupont.",
    graded: false,
    done: false,
    color: "#f21f43",
  },
];
