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

    if (user.password !== loginUserInput.password) {
      throw new BadRequestException(
        'Invalid credentials password does not patch',
      );
    }

    const payload = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });

    return { access_token: payload };
  }

  async findUserById(userId: number) {
    const findUserById = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUserById) {
      throw new BadRequestException(`There is no user with: ${userId} ID`);
    }
    return findUserById;
  }
}
