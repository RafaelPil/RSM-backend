import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return await this.postService.createPost(createPostInput);
  }

  @Query(() => [Post])
  async findAllPosts() {
    return await this.postService.findAllPosts();
  }

  @Query(() => Post)
  async findOnePost(@Args('postId') postId: number) {
    return await this.postService.findOnePost(postId);
  }

  @Mutation(() => Post)
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return await this.postService.updatePost(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  async removePost(@Args('postId') postId: number) {
    return await this.postService.removePost(postId);
  }
}
