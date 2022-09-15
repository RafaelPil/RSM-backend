import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    try {
      return await this.prisma.user.create({
        data: {
          email: createUserInput.email,
          password: createUserInput.password,
          name: createUserInput.name,
          phone: createUserInput.phone,
        },
      });
    } catch (e) {
      throw new BadRequestException('Error');
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(userId: number) {
    if (!userId) {
      return new BadRequestException('There is no User');
    }
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return await this.prisma.user.update({
      where: {
        id: updateUserInput.id,
      },
      data: {
        email: updateUserInput.email,
        name: updateUserInput.name,
        password: updateUserInput.password,
        phone: updateUserInput.phone,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
