import { Model, ObjectId } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('PostModel')
    private readonly postModel: Model,
    @InjectModel('UserModel')
    private readonly userModel: Model
  ) {
  }

  async create(body) {
    return this.postModel.create(body);
  }

  async delete(id) {
    return this.postModel.findByIdAndRemove(id);
  }

  async like(postId) {
    return this.postModel.findById(postId);
  }

  async getFeed(userId, offset, limit) {
    const followers = await this.userModel.find({ followers: userId });

    return this.postModel.findAll({ author: { $in: followers } }).offset(offset).limit(limit);
  }

  async getFollowingPosts(userId: ObjectId, offset?: number, limit?: number): Promise<any> {
    // this.userModel.findAll()
    // return this.postModel.findAll();
  }

  async getUserPosts(userId: ObjectId, offset?: number, limit?: number) {

  }

  async getWall(userId, offset, limit) {
    return await this.postModel.find({ author: userId }).skip(offset).limit(limit);
  }

  async getPost(postId) {

  }
}
