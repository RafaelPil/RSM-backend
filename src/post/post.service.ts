import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(createPostInput: CreatePostInput) {
    try {
      return await this.prisma.post.create({
        data: {
          city: createPostInput.city,
          image: createPostInput.image,
          title: createPostInput.title,
          price: createPostInput.price,
          userId: createPostInput.userId,
        },
        include: { user: true },
      });
    } catch (e) {
      throw new BadRequestException(
        `There is no User with userId: ${createPostInput.userId} `,
      );
    }
  }

  async findAllPosts() {
    return await this.prisma.post.findMany({
      include: { user: true },
    });
  }

  async findOnePost(postId: number) {
    try {
      return await this.prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: { user: true },
      });
    } catch (e) {
      throw new BadRequestException(`There is no post with: ${postId}id`);
    }
  }

  async updatePost(postId: number, updatePostInput: UpdatePostInput) {
    try {
      return await this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          city: updatePostInput.city,
          image: updatePostInput.image,
          price: updatePostInput.price,
          title: updatePostInput.title,
          userId: updatePostInput.userId,
        },
      });
    } catch (e) {
      throw new BadRequestException(`There is no post with: ${postId}id`);
    }
  }

  async removePost(postId: number) {
    try {
      return await this.prisma.post.delete({
        where: {
          id: postId,
        },
        include: { user: true },
      });
    } catch (e) {
      throw new BadRequestException(`There is no post with: ${postId}id`);
    }
  }
}
