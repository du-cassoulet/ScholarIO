import { Schema, SchemaTypes, model } from "mongoose";

const ClassSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    students: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Student",
        default: [],
      },
    ],
    teachers: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Teacher",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Class", ClassSchema);
export { ClassSchema };
