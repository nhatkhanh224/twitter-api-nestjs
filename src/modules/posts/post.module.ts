import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from '../../schemas/post.schema';
import { User, UserSchema } from '../../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}