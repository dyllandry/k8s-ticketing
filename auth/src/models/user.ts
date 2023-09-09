import mongoose from "mongoose";
import { Password } from "../services/password";

type UserBuildAttrs = {
  email: string;
  password: string;
};

type UserModel = mongoose.Model<any> & {
  build(attrs: UserBuildAttrs): UserDoc;
};

type UserDoc = mongoose.Document & {
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema<UserBuildAttrs>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

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
