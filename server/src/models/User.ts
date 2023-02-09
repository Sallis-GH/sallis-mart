import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  name: string
  email: string,
  password: string,
  role: string[],
  storeId: string,
}

export interface IUserModel extends IUser, Document {

}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: [String], required: true},
    storeId: {type: String, required: true},
  },
  {
    versionKey: false
  }
)

export default mongoose.model<IUserModel>('Users', UserSchema)