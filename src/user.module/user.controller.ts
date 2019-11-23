import { Controller, Body, Get, Post, Res, Param, Query, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiImplicitQuery, ApiUseTags, ApiImplicitHeader, ApiImplicitBody, ApiImplicitParam } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { DetailsDto } from './details.dto';

@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @ApiImplicitQuery({ name: 'limit', type: Number })
  @ApiImplicitHeader({ name: 'token'})
  @Post('nearby')
  async getNearbyUsers(@Req() req: Request, @Res() res: Response, @Query() query ) {
    const currentUserId = req['user'].userId;
    let users = await this.userService.getNearbyUsers(currentUserId, +query.limit);

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

    return res.json({
      status: 200,
      message: '',
      data: { user }
    });
  }

  @ApiImplicitHeader({ name: 'token'})
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body) {
    const user = await this.userService.saveUser(id, body);
  }

  @ApiImplicitHeader({ name: 'token'})
  @Post('details')
  async saveDetails(@Req() req, @Body() body: DetailsDto, @Res() res: Response) {
    const userId = req['user'].userId;

    const updateObject = Object.assign({}, body);
    updateObject['fulfilled'] = true;

    const result = await this.userService.updateUser(userId, updateObject);

    if (result) {
      return res.json({
        status: 200,
        message: '',
        data: result
      });
    } else {
      return res.json({
        status: 400,
        message: 'Wrong request',
        data: null
      });
    }
  }

  @ApiImplicitHeader({ name: 'token'})
  @ApiImplicitParam({ name: 'id', type: 'string', required: true })
  @Post('follow/:id')
  async follow(@Req() req, @Res() res, @Param('id') id) {
    const userId = req['user'].userId;
    const result = await this.userService.follow(userId, id);

    if (result) {
      return res.json({ status: 200, message: null, data: null });
    } else {
      return res.json({ status: 400, message: null, data: null });
    }
  }  
  
  @ApiImplicitHeader({ name: 'token'})
  @ApiImplicitParam({ name: 'id', type: 'string', required: true })
  @Post('followers/:id')
  async followers(@Req() req, @Res() res, @Param('id') id) {
    const result = await this.userService.getFollowers(id);

    if (result) {
      return res.json({ status: 200, message: null, data: result });
    } else {
      return res.json({ status: 400, message: 'Wrong request', data: null });
    }
  }

  @ApiImplicitHeader({ name: 'token'})
  @ApiImplicitParam({ name: 'id', type: 'string', required: true })
  @Post('following/:id')
  async followings(@Req() req, @Res() res, @Param('id') id) {
    const result = await this.userService.getFollowings(id);

    if (result) {
      return res.json({ status: 200, message: null, data: null });
    } else {
      return res.json({ status: 400, message: 'Wrong request', data: null });
    }
  }
}

