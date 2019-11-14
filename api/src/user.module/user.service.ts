import { Model, ObjectId } from 'mongoose';
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
      ]})
      .limit(10);
  }

  async getUser(id) {
    return this.userModel.findById(id);
  }

  async saveUser(id, body) {
    return;
  }

  async updateUser(id, body) {
    return this.userModel.updateById(id, { $set: body });
  }
}