import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { PostModule } from './modules/posts/post.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { CommentModule } from './modules/comments/comment.module';
dotenv.config();

@Module({
  imports: [
    UserModule,
    NotificationModule,
    PostModule,
    CommentModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
