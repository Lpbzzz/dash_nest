import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  //http请求处理
  controllers: [AppController],
  //注入器实例化的提供者
  providers: [AppService],
})
export class AppModule {}
