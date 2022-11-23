import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// controller控制的是http请求
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
