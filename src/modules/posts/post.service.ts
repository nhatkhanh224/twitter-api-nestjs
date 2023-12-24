import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from '../../schemas/post.schema';
import { User } from '../../schemas/user.schema'
import { Comment } from '../../schemas/comment.schema'
import { Model } from 'mongoose';
@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts.name) private readonly postModel: Model<Posts>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async findPostByID(postId: string): Promise<Posts | null> {
    const post = await this.postModel.findById(postId).sort({ createdAt: 'desc' }).exec();
    const user = await this.userModel.findById(post.userId).select(['name','username']).exec();
    const comments = await this.commentModel.find({postId}).sort({ createdAt: 'desc' }).exec();
    for (const comment of comments) {
      const user = await this.userModel.findById(comment.userId).select(['name','username']).exec();
      comment.user = user; // Gán user vào post
    }
    post.users = user;
    post.comments = comments;
    return post;
  }
  async createPost(body: string, userId: string, createdAt: Date, updatedAt: Date): Promise<Posts> {
    const newPost = new this.postModel({ body, userId, createdAt, updatedAt });
    return newPost.save();
  }
  async updatePost(postId: string, likedIds: string, updatedAt: Date): Promise<Posts> {
    const filter = { _id: postId };
    const update = { likedIds, updatedAt };
    return await this.postModel.findOneAndUpdate(filter, update).select('*').exec();
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
      const comments = await this.commentModel.find({postId: post._id}).sort({ createdAt: 'desc' }).exec();
      post.users = user; // Gán user vào post
      post.comments = comments; //Gán comments vào post
    }
    return posts;
  }
}
