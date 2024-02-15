import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthResponseType } from './types';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from 'jsonwebtoken';

interface IRequestWithUser extends Request {
  user: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signup(@Body() data: CreateUserDto): AuthResponseType {
    return this.authService.signup(data);
  }

  @Post()
  async login(@Body() data: AuthDto): AuthResponseType {
    return this.authService.login(data);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: IRequestWithUser) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
