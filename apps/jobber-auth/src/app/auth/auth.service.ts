import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { LoginInput } from './dto/login.input';
import { UserService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcryptjs';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login({ email, password }: LoginInput, response: Response) {
    const user = await this.verifyUser(email, password);
    const expires = new Date();
    expires.setMilliseconds(
      expires.setMilliseconds(
        expires.getTime() +
          parseInt(this.configService.getOrThrow('JWT_EXPIRATION_MS'))
      )
    );
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires,
      sameSite: 'strict',
      path: '/',
    });
    return user;
  }

  private async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ email });
      if (!user || !user.id) {
        throw new UnauthorizedException('User not found');
      }
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials', err.message);
    }
  }
}
