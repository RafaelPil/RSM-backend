import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  profile(@CurrentUser() user: User) {
    return this.authService.findUserById(user.id);
  }
}
