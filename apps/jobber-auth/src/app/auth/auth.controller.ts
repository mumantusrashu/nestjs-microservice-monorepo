import { Controller, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AuthServiceController,
  AuthenticateRequest,
  User,
  AuthServiceControllerMethods,
} from 'types/proto/auth';
import { JwtAuthGuard } from './gaurds/jwt-auth.gaurds';
import { UserService } from '../users/users.service';
import { TokenPayload } from './token-payload.interface';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthenticateRequest & { user: TokenPayload }
  ): Promise<User> | Observable<User> | User {
    console.log(request);
    return this.userService.getUser({ id: request.user.userId });
  }
}
