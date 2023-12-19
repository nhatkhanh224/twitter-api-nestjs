import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from '../../schemas/post.schema';
import { User } from '../../schemas/user.schema'
import { Model } from 'mongoose';
@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts.name) private readonly postModel: Model<Posts>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findPostByID(postId: string): Promise<Posts | null> {
    const post = await this.postModel.findById(postId)
      .populate('users')  // Bao gồm thông tin về người dùng liên quan
      .populate({
        path: 'comments',
        populate: {
          path: 'users',   // Bao gồm thông tin về người dùng liên quan đến bình luận
        },
        options: { sort: { createdAt: 'desc' } },  // Sắp xếp theo thời gian tạo mới nhất
      })
      .exec();
    return post;
  }
  async createPost(body: string, userId: string, createdAt: Date, updatedAt: Date): Promise<Posts> {
    const newPost = new this.postModel({ body, userId, createdAt, updatedAt });
    return newPost.save();
  }
  async findPostByUserID(userId: string): Promise<Posts[]> {
    let query = {};

    if (userId) {
      query = { userId };
    }

    const posts = await this.postModel.find(query).sort({ createdAt: 'desc' }).exec();

    // Lặp qua mỗi post và gán thông tin user vào post
    for (const post of posts) {
      const user = await this.userModel.findById(post.userId).select(['name','username']).exec();
      post.users = user; // Gán user vào post
    }
    return posts;
  }
}
