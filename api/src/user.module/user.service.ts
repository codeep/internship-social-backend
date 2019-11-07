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

  async getUser(id) {
    // return this.userModel.create(body);
  }

  async getNearbyUsers(userId) {
    this.userModel
      .findById(userId)
      .then((user) => {
        return this.userModel
          .findAll()
          .limit(3);
      });
  }

  async searchUsers() {
    return this.userModel.find({ /*  */ });
  }
}