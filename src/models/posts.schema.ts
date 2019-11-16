import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: mongoose.Types.ObjectId,
  attachments: [{
    title: String,
    url: String
  }]
}, { collection: 'sn_post' });
