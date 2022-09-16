import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { nullable: true })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => [User], { nullable: true })
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Query(() => User, { nullable: true })
  async findOneUser(@Args('userId') userId: number) {
    return await this.userService.findOneUser(userId);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.updateUser(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('userId') userId: number) {
    return this.userService.removeUser(userId);
  }
}
