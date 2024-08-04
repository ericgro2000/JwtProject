import { Schema, model, Model, Document } from "mongoose";

interface RoleDocument extends Document {
  value: string;
}

const RoleSchema = new Schema<RoleDocument>({
  value: { type: String, unique: true, default: "USER" },
});

const Role: Model<RoleDocument> = model<RoleDocument>("Role", RoleSchema);

export default Role;