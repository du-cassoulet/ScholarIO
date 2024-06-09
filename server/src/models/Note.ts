import { Schema, SchemaTypes, model } from "mongoose";

const NoteSchema = new Schema(
  {
    student: {
      type: SchemaTypes.ObjectId,
      ref: "Student",
      required: true,
    },
    teacher: {
      type: SchemaTypes.ObjectId,
      ref: "Teacher",
      required: true,
    },
    evaluation: {
      type: SchemaTypes.ObjectId,
      ref: "Evaluation",
      required: true,
    },
    grade: {
      type: SchemaTypes.Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Note", NoteSchema);
export { NoteSchema };
