import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from '../../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }
  @Post()
  async findUserByEmail(@Body() {email}): Promise<User> {
    return this.userService.findUserByEmail(email);
  }
  @Post("/createAccount")
  async createUser(@Body() { username, email, name, password, createdAt, updateAt }):  Promise<User> {
    return await this.userService.createUser(username, email, name, password, createdAt, updateAt);
  }
  // @Get(':username')
  // async findUserByUsername(@Param('username') username: string): Promise<User> {
  //   return this.userService.findUserByUsername(username);
  // }
  @Get(':userId')
  async findUserByID(@Param('userId') userId: string): Promise<User> {
    return this.userService.findUserByID(userId);
  }
  @Put("/updateProfile")
  async updateProfile(@Body() { id, name, username, bio, profileImage, coverImage, hasNotification, followingIds }):  Promise<User> {
    return await this.userService.updateProfile( id, name, username, bio, profileImage, coverImage, hasNotification, followingIds);
  }
  @Get('/follow/:userId')
  async findFollowID(@Param('userId') userId: string): Promise<User> {
    return this.userService.findFollowID(userId);
  }
  @Get('/follow/count/:userId')
  async countFollowers(@Param('userId') userId: string): Promise<User> {
    return this.userService.countFollowers(userId);
  }
}