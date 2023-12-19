import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { PostService } from "./post.service"
import { Posts } from '../../schemas/post.schema';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('/findPostByID')
  async findPostByID(@Body() { postId }): Promise<Posts> {
    return this.postService.findPostByID(postId);
  }
  @Post('/createPost')
  async createPost(@Body() { body, userId, createdAt, updatedAt }): Promise<Posts> {
    return this.postService.createPost(body, userId, createdAt, updatedAt);
  }
  @Post('/findPostByUserID')
  async findPostByUserID(@Body() { userId }): Promise<Posts[]> {
    return this.postService.findPostByUserID(userId);
  }
}