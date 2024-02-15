import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.register(s)],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ConfigService],
})
export class AuthModule {}
