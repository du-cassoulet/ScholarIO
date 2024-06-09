import School, { SchoolSchema } from "./School";
import Student, { StudentSchema } from "./Student";
import Teacher, { TeacherSchema } from "./Teacher";
import Parent, { ParentSchema } from "./Parent";
import Note, { NoteSchema } from "./Note";
import Class, { ClassSchema } from "./Class";
import Punishment, { PunishmentSchema } from "./Punishment";
import Evaluation, { EvaluationSchema } from "./Evaluation";

enum Role {
  School = "school",
  Student = "student",
  Teacher = "teacher",
  Parent = "parent",
}

export {
  Role,
  School,
  Student,
  Teacher,
  Parent,
  Note,
  Class,
  Punishment,
  Evaluation,
  SchoolSchema,
  StudentSchema,
  TeacherSchema,
  ParentSchema,
  NoteSchema,
  ClassSchema,
  PunishmentSchema,
  EvaluationSchema,
};
