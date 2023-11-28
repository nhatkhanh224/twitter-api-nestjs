import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from '../../schemas/notification.schema';
import { Model } from 'mongoose';
@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>) { }
  async create(body: string, userId: string, createdAt: Date, updatedAt: Date): Promise<Notification> {
    const newNotification = new this.notificationModel({ body, userId, createdAt, updatedAt });
    return newNotification.save();
  }
}
