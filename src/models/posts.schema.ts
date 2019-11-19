import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {type: mongoose.Types.ObjectId, ref: 'User'},
  attachments: [{
    title: String,
    url: String
  }]
}, { collection: 'sn_post' });
