import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { IAutTokensResponse } from './types';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from 'jsonwebtoken';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';

interface IRequestWithUser extends Request {
  user: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signup(@Body() data: CreateUserDto): Promise<IAutTokensResponse> {
    return this.authService.signup(data);
  }

  @Post('signIn')
  async login(@Body() data: AuthDto): Promise<IAutTokensResponse> {
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
