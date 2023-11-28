import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  @Prop()
  body: string;

  @Prop()
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  deleteAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);