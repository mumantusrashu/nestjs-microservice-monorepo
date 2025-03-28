import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/users.model';
import { UserService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') CreateUserInput: CreateUserInput) {
    return this.userService.createUser(CreateUserInput);
  }
  @Query(() => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
