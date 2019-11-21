import { mongoose, Model, ObjectId } from 'mongoose';
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

  async create(userId, body) {
    const post = new this.postModel(body);
    post.author = userId;

    return post.save();
  }

  async delete(userId, id) {
    return this.postModel.remove({ author: userId, _id: id })
  }

  async like(userId, postId) {
    const post = await this.postModel.findById(postId);
    let operator;
    if (post.likes.includes(userId)) {
      operator = '$pull';
    } else {
      operator = '$push';
    }

    return this.postModel.findByIdAndUpdate(postId,  { [operator]: { likes: userId } });
  }

  async getFeed(userId, offset, limit) {
    const followings = await this.userModel.findById(userId, 'followings');

    return this.postModel.find({ author: { $in: followings } }).skip(offset).limit(limit);
  }

  async getFollowingPosts(userId: ObjectId, offset?: number, limit?: number): Promise<any> {
    // this.userModel.findAll()
    // return this.postModel.findAll();
  }

  async getUserPosts(userId: ObjectId, offset?: number, limit?: number) {

  }

  async getWall(userId, offset, limit) {
    return await this.postModel.find({ author: userId }).skip(offset).limit(limit).populate('author');
  }

  async getPost(postId) {

  }
}
