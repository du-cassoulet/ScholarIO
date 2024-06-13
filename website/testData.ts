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
  createdAt: Moment;
  subject: string;
  teacher: string;
  graded: boolean;
  done: boolean;
  color: string;
};

export type Note = {
  title: string;
  evaluationDate?: Moment;
  createdAt: Moment;
  grade: number;
  points?: number;
  average: number;
  max: number;
  min: number;
  coefficient: number;
};

export type Subject = {
  name: string;
  coefficient: number;
  notes: Note[];
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
    createdAt: moment().startOf("day").subtract(1, "day"),
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
    createdAt: moment().startOf("day").subtract(1, "day"),
    subject: "Français",
    teacher: "Mme. Dupont.",
    graded: true,
    done: false,
    color: "#1f50f2",
  },
  {
    description: "Apprendre la leçon sur les fractions.",
    due: moment().startOf("day").add(1, "days"),
    createdAt: moment().startOf("day").subtract(1, "day"),
    subject: "Mathématiques",
    teacher: "M. Dupont.",
    graded: false,
    done: false,
    color: "#f21f43",
  },
];

export const notes: Subject[] = [
  {
    name: "Mathématiques",
    coefficient: 3,
    notes: [
      {
        title: "Additions",
        evaluationDate: moment().startOf("day").subtract(1, "day"),
        createdAt: moment().startOf("day").subtract(1, "day"),
        grade: 12,
        average: 10.55,
        max: 20,
        min: 2.5,
        coefficient: 2,
      },
      {
        title: "Fractions",
        evaluationDate: moment().startOf("day").subtract(1, "day"),
        createdAt: moment().startOf("day").subtract(1, "day"),
        grade: 14,
        average: 8.79,
        max: 16.75,
        min: 3,
        coefficient: 1,
      },
    ],
  },
  {
    name: "Français",
    coefficient: 2,
    notes: [
      {
        title: "Dictée",
        evaluationDate: moment().startOf("day").subtract(1, "day"),
        createdAt: moment().startOf("day").subtract(1, "day"),
        grade: 15.5,
        points: 25,
        average: 12.48,
        max: 22,
        min: 0,
        coefficient: 1,
      },
      {
        title: "Rédaction",
        evaluationDate: moment().startOf("day").subtract(1, "day"),
        createdAt: moment().startOf("day").subtract(1, "day"),
        grade: 17,
        average: 15.37,
        max: 18.5,
        min: 1.5,
        coefficient: 2,
      },
    ],
  },
];
