import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema'
// import { Posts } from './post.schema'

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  toObject() {
    throw new Error('Method not implemented.');
  }
  @Prop()
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' })
  postId: Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  deleteAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);