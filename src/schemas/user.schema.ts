import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {Posts} from './post.schema';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User  {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  bio: string;

  @Prop()
  coverImage: string;

  @Prop()
  profileImage: string;

  @Prop()
  followingIds: string[];

  @Prop()
  hasNotification: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  deleteAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);