import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  attachments: [{
    title: String,
    url: String
  }]
}, { collection: 'sn_post' });
