import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserInput: LoginUserInput): Promise<any> {
    console.log(loginUserInput);
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginUserInput.email,
      },
    });

    if (!user) {
      throw new BadRequestException(`Invalid credentials no User`);
    }

    const isMatch = await bcrypt.compare(
      loginUserInput.password, //password
      user.password, // hased password
    );

    if (!isMatch) {
      throw new BadRequestException(`password is invalid`);
    }

    const payload = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });

    return { access_token: payload };
  }

  async profile(userData: any): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    return user;
  }
}
