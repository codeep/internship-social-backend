import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
const sha1 = require('sha1');
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('UserModel')
    private readonly userModel: Model
  ) {
  }

  async login(email, password): Promise<any> {
    return this.userModel.findOne({ email, password: this.hashPassword(password) });
  }

  async register(registerData): Promise<any> {
    return this.userModel
      .findOne({ email: registerData.email })
      .then(user => {
        if (user) {
          return Promise.reject();
        }
        registerData.password = this.hashPassword(registerData.password);
        return this.userModel.create(registerData);
      });
  }

  async confirm(token): Promise<any> {
    return this.userModel
      .findOneAndUpdate({ confirmToken: token }, { confirmed: 1 })
      .then(user => {
        if (!user) {
          return Promise.reject();
        }
        return Promise.resolve(user);
      });
  }

  async recover(email): Promise<any> {

  }

  hashPassword(password) {
    return sha1(`6f9b9af3cd6e8b8a73c2cdced37fe9f59226e27d${password}d72e62295f9ef73decdc2c37a8b8e6dc3fa9b9f6`);
  }
}
