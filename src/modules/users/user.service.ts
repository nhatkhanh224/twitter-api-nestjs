import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).select(['-profileImage','-coverImage']).exec();
  }
  async createUser(username: string, email: string, name: string, password: string, createdAt: string, updateAt: string): Promise<User> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({ username, email, name, password: hashedPassword, createdAt, updateAt });
    return newUser.save();
  }
  async findUserByUsername(username: string): Promise<User | null> {
    // return await this.userModel.findOne({ username }).select('-password').exec();
    return await this.userModel.findOne({ username }).exec();
  }
  async findUserByID(userId: string): Promise<User | null> {
    // return await this.userModel.findOne({ username }).select('-password').exec();
    return await this.userModel.findOne({ _id: userId  }).exec();
  }
  async updateProfile( id: string, name: string, username: string, bio: string, profileImage: string, coverImage: string, hasNotification: boolean, followingIds:string[]): Promise<User | null> {
    const filter = { _id: id };
    const update = { name, username, bio, profileImage, coverImage, followingIds, hasNotification };
    return await this.userModel.findOneAndUpdate(filter, update).select(['-profileImage','-coverImage','-password']).exec();
  }
  async findFollowID(userId: string): Promise<User | null> {
    return await this.userModel.findOne({ _id: userId }).select(['-profileImage','-coverImage','-password']).exec();
  }
  async countFollowers(userId: string): Promise<User | null> {
    const result = await this.userModel.aggregate([
      {
        $unwind: '$followingIds',
      },
      {
        $match: {
          followingIds: userId,
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    return result.length > 0 ? result[0].count : 0;
  }
}
