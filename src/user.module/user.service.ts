import { Model } from 'mongoose';
import { ObjectId } from 'mongoose/lib/types/';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('UserModel')
    private readonly userModel: Model
  ) {
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
      ]}, '-password')
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
    const user = await this.userModel.findOne({ _id: ObjectId(followingId), followers: followerId }, 'followers');

    let operator;
    if (user && user.followers.includes(followerId)) {
      operator = '$pull';
    } else {
      operator = '$push';
    }

    return Promise.all([
      this.userModel.findByIdAndUpdate(followingId, { [operator]: { followers: followerId }}),
      this.userModel.findByIdAndUpdate(followerId, { [operator]: { followings: followingId }}),
    ]);
  }

  async getFollowers(userId) {
    const followers = await this.userModel.findById({ _id: ObjectId(userId) }, 'followers');
    return this.userModel.find({ _id: { $in: followers }})
  }

  async getFollowings(userId) {
    return this.userModel.find({ followers: userId });
  }
}