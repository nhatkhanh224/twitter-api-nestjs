import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CommentService } from "./comment.service"
import { Comment } from '../../schemas/comment.schema';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }
  @Post()
  async createPost(@Body() { body, userId, postId, createdAt, updatedAt }): Promise<Comment> {
    return this.commentService.createComment(body, userId, postId, createdAt, updatedAt);
  }
}