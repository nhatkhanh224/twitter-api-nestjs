import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
  async createUser(@Body() { username, email, name, password }):  Promise<User> {
    return await this.userService.createUser(username, email, name, password);
  }
}