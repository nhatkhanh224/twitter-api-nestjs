import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }
  async createUser(username: string, email: string, name: string, password: string): Promise<User> {
    const newUser = new this.userModel({ username, email, name, password });
    return newUser.save();
  }
}
