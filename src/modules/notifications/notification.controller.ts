import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { NotificationService } from "./notification.service"
import { Notification } from '../../schemas/notification.schema';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post()
  async create(@Body() { body, userId, createdAt, updateAt }):  Promise<Notification> {
    return this.notificationService.create(body, userId, createdAt, updateAt);
  }
}