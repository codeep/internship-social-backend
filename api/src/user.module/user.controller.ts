import { Controller, Body, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @Get()
  async getUsers() {

  }

  @Get(':id') 
  async getUser() {

  }

  @Put(':id') 
  async updateUser(@Body() body: UserDto) {

  }
}
