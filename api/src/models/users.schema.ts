import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  birthdate: String,
  password: String
}, { collection: 'sn_user' });