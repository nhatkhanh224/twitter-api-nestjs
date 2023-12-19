import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema'

export type PostDocument = HydratedDocument<Posts>;

@Schema()
export class Posts {
  @Prop()
  body: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  image: string;

  @Prop()
  likedIds: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  deleteAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  users: User;
}

export const PostSchema = SchemaFactory.createForClass(Posts);