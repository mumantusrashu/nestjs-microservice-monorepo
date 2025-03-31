import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { User } from '../users/models/users.model';
import { LoginInput } from './dto/login.input';
import { GqlContext } from '@jobber/nestjs';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GqlContext
  ) {
    return this.authService.login(loginInput, context.res);
  }
}
