import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './models/users.model';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: { email: string; password: string }): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
