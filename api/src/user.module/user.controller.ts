import { Controller, Body, Get, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { response } from 'express';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Get()
  async getNearbyUsers(@Res() res: Response) {
    /* TODO replace with real id */
    const userId = 1;
    const users = await this.userService.getNearbyUsers(userId);

    // return res.json({
    //   status: 404,
    //   message: 'User is not found',
    //   data: users
    // });
  }

  @Get()
  async searchUsers(@Res() res: Response) {
    const users = await this.userService.searchUsers();

    return res.json({
      status: 200,
      message: '',
      data: users
    });
  }

  @Get(':id') 
  async getUser() {

  }

  @Put(':id') 
  async updateUser(@Body() body: UserDto) {

  }
}
