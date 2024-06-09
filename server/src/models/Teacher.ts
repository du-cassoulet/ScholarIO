import { Schema, SchemaTypes, model } from "mongoose";

const TeacherSchema = new Schema(
  {
    email: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
      trim: true,
    },
    hash: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    firstName: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
    lastName: {
      type: SchemaTypes.String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_, ret) => {
        delete ret.hash;
        delete ret.salt;
      },
    },
    methods: {
      verifyPassword(password: string) {
        return Bun.password.verifySync(password, this.hash);
      },
    },
  }
);

TeacherSchema.pre("save", async function (next) {
  if (!this.isModified("hash")) return next();

  this.hash = await Bun.password.hash(this.hash, {
    algorithm: "bcrypt",
    cost: Number(Bun.env.PASSWORD_BCRYPT_COST),
  });

  return next();
});

export default model("Teacher", TeacherSchema);
export { TeacherSchema };
