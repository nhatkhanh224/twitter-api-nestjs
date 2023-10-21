import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('https://example.com', 301) // Chuyển hướng với status code 301
  getHello() {
    return { url: 'http://localhost:3001' }; // URL bạn muốn chuyển hướng tới
  }
}
