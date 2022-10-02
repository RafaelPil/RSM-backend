import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(loginUserInput: LoginUserInput) {
    const loginUser = await this.prisma.user.findUnique({
      where: {
        email: loginUserInput.email,
      },
    });

    if (!loginUser) {
      throw new BadRequestException(
        `user with ${loginUserInput.email} not exists`,
      );
    }

    const isMatch = await bcrypt.compare(
      loginUserInput.password, //password
      loginUser.password, // hased password
    );

    if (!isMatch) {
      throw new BadRequestException(`password is invalid`);
    }

    const token = this.jwtService.sign({
      id: loginUser.id,
      email: loginUser.email,
      name: loginUser.name,
    });
    console.log(token);
    return { access_token: token };
  }
}
