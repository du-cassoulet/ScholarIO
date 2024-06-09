import { Schema, SchemaTypes, model } from "mongoose";

const EvaluationSchema = new Schema(
  {
    class: {
      type: SchemaTypes.ObjectId,
      ref: "Class",
      required: true,
    },
    teacher: {
      type: SchemaTypes.ObjectId,
      ref: "Teacher",
      required: true,
    },
    notes: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Note",
        default: [],
      },
    ],
    title: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Evaluation", EvaluationSchema);
export { EvaluationSchema };
