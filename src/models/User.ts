import { Schema, model, Model, Document } from "mongoose";

interface UserDocument extends Document {
  username: string;
  password: string;
  roles: string[];
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

const User: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export default User;