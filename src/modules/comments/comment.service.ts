import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../../schemas/comment.schema';
import { Model } from 'mongoose';
@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) { }

  async createComment(body: string, userId: string, postId: string, createdAt: Date, updatedAt: Date): Promise<Comment> {
    const newComment = new this.commentModel({ body, userId, postId, createdAt, updatedAt });
    return newComment.save();
  }
}
