import { Controller, Body, Get, Post, Res, Param, Query, Put } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserDto } from './user.dto';
import { ApiImplicitQuery, ApiUseTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Response } from 'express';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Post('nearby')
  async getNearbyUsers(@Res() res: Response) {
    /* TODO replace with real id */
    const users = await this.userService.getNearbyUsers();

    return res.json({
      status: 404,
      message: 'User is not found',
      data: users
    });
  }

  @ApiImplicitQuery({
    name: 'search',
    required: true,
    type: String
  })
  @Get()
  async searchUsers(@Query('search') search, @Res() res: Response) {
    const users = await this.userService.searchUsers(search);

    return res.json({
      status: 200,
      message: '',
      data: users
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: ObjectId, @Res() res: Response) {
    const user = await this.userService.getUser(id);
    delete user.password;

    return res.json({
      status: 200,
      message: '',
      data: user
    });
  }

  @Put(':id')
  async updateUser(@Param('id') id: ObjectId, @Body() body) {
    await this.userService.saveUser(id, body);
  }
}
