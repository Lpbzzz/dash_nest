import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async login(loginUser: CreateUserDto) {
    const { username, password } = loginUser;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (!existUser) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    const isPasswordValid = await bcrypt.compareSync(
      password,
      existUser.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    } else {
      return {
        token: this.createToken({
          username,
          id: existUser.id,
          role: existUser.role,
        }),
        ...existUser,
      };
    }
  }
}
