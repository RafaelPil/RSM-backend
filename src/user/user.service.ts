import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserInput: CreateUserInput) {
    const saltOrRounds = 10;
    const password = createUserInput.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    try {
      return await this.prisma.user.create({
        data: {
          email: createUserInput.email,
          password: hashedPassword,
          name: createUserInput.name,
          phone: createUserInput.phone,
        },
      });
    } catch (e) {
      throw new BadRequestException('Error');
    }
  }

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async findOneUserById(userId: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    } catch (e) {
      throw new BadRequestException('There is no User');
    }
  }

  async findOneUser(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  // async updateUser(userId: number, updateUserInput: UpdateUserInput) {
  //   try {
  //     return await this.prisma.user.update({
  //       where: {
  //         id: userId,
  //       },
  //       data: {
  //         email: updateUserInput.email,
  //         name: updateUserInput.name,
  //         password: updateUserInput.password,
  //         phone: updateUserInput.phone,
  //       },
  //     });
  //   } catch (e) {
  //     throw new BadRequestException('There is no User');
  //   }
  // }

  // async removeUser(userId: number) {
  //   try {
  //     return await this.prisma.user.delete({
  //       where: {
  //         id: userId,
  //       },
  //     });
  //   } catch (e) {
  //     throw new BadRequestException('There is no User');
  //   }
  // }
}
