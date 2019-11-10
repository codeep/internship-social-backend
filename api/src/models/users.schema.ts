import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  birthdate: String,
  password: String,
  fulfilled: Boolean,
  followers: [mongoose.ObjectId]
}, { collection: 'sn_user' });
