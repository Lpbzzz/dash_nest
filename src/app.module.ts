import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfig from '../config/env';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config({ path: envConfig.path });

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWD, DB_DATABASE } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        entities: [User], // 数据表实体
        host: configService.get('DB_HOST', DB_HOST), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', Number(DB_PORT)), // 端口号
        username: configService.get('DB_USER', DB_USER), // 用户名
        password: configService.get('DB_PASSWORD', DB_PASSWD), // 密码
        database: configService.get('DB_DATABASE', DB_DATABASE), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }),
    UserModule,
    AuthModule,
  ],
  //http请求处理
  controllers: [AppController],
  //注入器实例化的提供者
  providers: [AppService],
})
export class AppModule {}
