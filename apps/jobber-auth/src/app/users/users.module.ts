import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UsersModule {}
