import { Controller, Body, Get, Post, Res, Param, Query, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserDto } from './user.dto';
import { ApiImplicitQuery, ApiUseTags, ApiImplicitHeader } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Response } from 'express';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @ApiImplicitHeader({ name: 'token'})
  @Post('nearby')
  async getNearbyUsers(@Res() res: Response) {
    /* TODO replace with real id */
    const users = await this.userService.getNearbyUsers();

    return res.json({
      status: 200,
      message: '',
      data: users
    });
  }

  @ApiImplicitHeader({ name: 'token'})
  @ApiImplicitQuery({
    name: 'search',
    required: false,
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

  @ApiImplicitHeader({ name: 'token'})
  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.getUser(id);
    delete user.password;

    return res.json({
      status: 200,
      message: '',
      data: user
    });
  }

  @ApiImplicitHeader({ name: 'token'})
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body) {
    await this.userService.saveUser(id, body);
  }

  @ApiImplicitHeader({ name: 'token'})
  @Post('details')
  async saveDetails(@Req() req, @Body() body, @Res() res: Response) {
    const userId = req['user'].userId;
    const updateObject = {
      occupation: body.occupation,
      location: body.location,
      bio: body.bio
    };

    const result = await this.userService.updateUser(userId, updateObject);
    console.log('result', result);
  }
}
