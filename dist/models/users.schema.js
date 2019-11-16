"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
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
    bio: String
}, { collection: 'sn_user' });
//# sourceMappingURL=users.schema.js.map