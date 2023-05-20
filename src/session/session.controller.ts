import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionService } from './session.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller()
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john@gmail.com' },
        password: { type: 'string', example: 'mySecretPass' },
      },
    },
  })
  @ApiCreatedResponse({ description: 'Successfully logged in!' })
  @ApiUnauthorizedResponse({ description: 'Not valid email or password!' })
  async login(@Res({ passthrough: true }) response: Response, @Request() req) {
    const { access_token } = await this.sessionService.login(req.user);
    response.cookie('access_token', access_token);
    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiCookieAuth('access_token')
  @ApiCreatedResponse({ description: 'Successfully logged out!' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
  }
}
