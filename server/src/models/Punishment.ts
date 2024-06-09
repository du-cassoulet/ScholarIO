import { Schema, SchemaTypes, model } from "mongoose";

const PunishmentSchema = new Schema(
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
    title: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    reason: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    type: {
      type: SchemaTypes.String,
      required: true,
      enum: ["Cross", "Detention", "Expulsion"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Punishment", PunishmentSchema);
export { PunishmentSchema };
