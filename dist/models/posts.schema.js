"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    attachments: [{
            title: String,
            url: String
        }]
}, { collection: 'sn_post' });
//# sourceMappingURL=posts.schema.js.map