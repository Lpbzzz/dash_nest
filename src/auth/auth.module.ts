import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

const jwtModule = JwtModule.register({
  secret: 'lpb',
  signOptions: { expiresIn: '7d' },
});

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [jwtModule, TypeOrmModule.forFeature([User])],
  exports: [jwtModule],
})
export class AuthModule {}
