import { Schema, SchemaTypes, model } from "mongoose";

const SchoolSchema = new Schema(
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
    name: {
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

SchoolSchema.pre("save", async function (next) {
  if (!this.isModified("hash")) return next();

  this.hash = await Bun.password.hash(this.hash, {
    algorithm: "bcrypt",
    cost: Number(Bun.env.PASSWORD_BCRYPT_COST),
  });

  return next();
});

export default model("School", SchoolSchema);
export { SchoolSchema };
