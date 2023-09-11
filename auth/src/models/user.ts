import mongoose from "mongoose";
import { Password } from "../services/password";

type UserBuildAttrs = {
  email: string;
  password: string;
};

type UserModel = mongoose.Model<UserDoc> & {
  build(attrs: UserBuildAttrs): UserDoc;
};

type UserDoc = mongoose.Document & {
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema<UserBuildAttrs>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// To provide type safety, since mongoose doesn't enforce types
// passed to new User(...)
userSchema.statics.build = (attrs: UserBuildAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
