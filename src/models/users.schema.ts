import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  birthdate: String,
  password: String,
  fulfilled: Boolean,
  followers: [mongoose.ObjectId],
  followings: [mongoose.ObjectId],
  occupation: String,
  location: String,
  bio: String,
  cover: String,
  avatar: String
}, { collection: 'sn_user' });

mongoose.model('User', UserSchema);