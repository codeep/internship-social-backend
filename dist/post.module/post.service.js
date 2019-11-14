"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let PostService = class PostService {
    constructor(postModel, userModel) {
        this.postModel = postModel;
        this.userModel = userModel;
    }
    async create(userId, body) {
        const post = new this.postModel(body);
        post.author = userId;
        return this.postModel.create(body);
    }
    async delete(userId, id) {
        return this.postModel.delete({ author: userId, id });
    }
    async like(userId, postId) {
        const post = await this.postModel.findById(postId);
        let operator;
        if (post.likes.includes(userId)) {
            operator = '$pull';
        }
        else {
            operator = '$push';
        }
        return this.postModel.findAndUpdateById(postId, { $set: { [operator]: userId } });
    }
    async getFeed(userId, offset, limit) {
        const followers = await this.userModel.find({ followers: userId });
        return this.postModel.findAll({ author: { $in: followers } }).offset(offset).limit(limit);
    }
    async getFollowingPosts(userId, offset, limit) {
    }
    async getUserPosts(userId, offset, limit) {
    }
    async getWall(userId, offset, limit) {
        return await this.postModel.find({ author: userId }).skip(offset).limit(limit);
    }
    async getPost(postId) {
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('PostModel')),
    __param(1, mongoose_2.InjectModel('UserModel')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map