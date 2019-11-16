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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const types_1 = require("mongoose/lib/types/");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getNearbyUsers() {
        return this.userModel.aggregate([
            {
                $sample: { size: 3 }
            },
            {
                $project: {
                    password: 0,
                    email: 0
                }
            }
        ]);
    }
    async searchUsers(search) {
        return this.userModel
            .find({ $or: [
                { firstname: new RegExp(search, 'g') },
                { lastname: new RegExp(search, 'g') }
            ] }, '-password')
            .limit(10);
    }
    async getUser(id) {
        return this.userModel.findById(id, '-password');
    }
    async saveUser(id, body) {
        return;
    }
    async updateUser(id, body) {
        return this.userModel.updateById(id, { $set: body });
    }
    async follow(followerId, followingId) {
        const user = await this.userModel.findOne({ _id: types_1.ObjectId(followingId), followers: followerId }, 'followers');
        let operator;
        if (user && user.followers.includes(followerId)) {
            operator = '$pull';
        }
        else {
            operator = '$push';
        }
        return Promise.all([
            this.userModel.findByIdAndUpdate(followingId, { [operator]: { followers: followerId } }),
            this.userModel.findByIdAndUpdate(followerId, { [operator]: { followings: followingId } }),
        ]);
    }
    async getFollowers(userId) {
        const followers = await this.userModel.findById({ _id: types_1.ObjectId(userId) }, 'followers');
        return this.userModel.find({ _id: { $in: followers } });
    }
    async getFollowings(userId) {
        return this.userModel.find({ followers: userId });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('UserModel')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map