import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() requestBody: LoginDto, @Res() res: Response) {
    try {
      await this.authService.login(requestBody.email, requestBody.password);
    } catch (e) {
      return res.json({
        status: 404,
        message: 'User is not found',
        data: {}
      });
    }
  }

  @Post('register')
  async register(@Body() requestBody: RegisterDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(requestBody);
      if (user) {
        return res.json({
          status: 201,
          message: '',
          data: user
        });
      }
    } catch (e) {
      return res.json({
        status: 409,
        message: 'User already exists',
        data: {}
      });  
    }
  }

  @Post('recover')
  async recover(@Body() email, @Res() res: Response) {
    try {
      await this.authService.recover(email);
      return res.json({
        status: 200,
        message: '',
        data: {}
      });
    } catch (e) {
      return res.json({
        status: 500,
        message: 'Internal server error',
        data: {}
      });
    }
  }

  @Get('confirm')
  @ApiImplicitQuery ({
    name: 'token',
    required: true,
    type: String
  })
  async confirm(@Query() queryParams, @Res() res: Response) {
    try {
      this.authService.confirm(queryParams.token);
        return res.json({
          status: 200,
          message: '',
          data: {}
        });
    } catch (e) {
      return res.json({
        status: 400,
        message: 'Token is not valid',
        data: {}
      });
    }
  }
}
